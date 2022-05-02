import React, { useCallback } from "react";
import "./index.css";
import { Card, List, Form, Input, Button, InputNumber, Select } from "antd";
import {
  PlusCircleOutlined,
  CheckCircleFilled,
  CloseCircleOutlined,
} from "@ant-design/icons";
import ColorPicker from "./ColorPicker";
import DeleteDialog from "./DeleteDialog";
import { cloneDeep } from "lodash";
import * as echarts from "echarts/core";
import { TooltipComponent, LegendComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { db } from "../../firebase";
import {
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import cityData from "./data.json";
import { get as getObjData } from "lodash";
import { isEmpty } from "@firebase/util";
import {  getUserID} from "../DB/readingfb.js";

const { useState, useEffect, useRef } = React;
const cityMap = {};
for (let item of cityData) {
  cityMap[item.id] = item;
}
//For echarts
echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

function randomColor() {
  var color = "#";
  //random get 0-15 and use tostring (16) in to color
  for (var i = 0; i < 6; i++)
    color += parseInt(Math.random() * 16).toString(16);
    return color;
}
function Index() {

  const [countList, setCountList] = useState([
    {
      id: 1,
      color: "",
      name: "",
      price: 1,
      isNew: true,
    },
  ]); //for the left input data{id:1,color:"",name:"",price:"",isNew:false}
  const [handleDeleteId, setHandleDeleteId] = useState(); //For Delete button
  const [obj, setObj] = useState();
  const [deleteAllFlag, setDeleteAllFlag] = useState(false);
  const [cityObj, setCityObj] = useState({});
  const [allPrice, setAllPrice] = useState(0);
  const formRef = useRef();
  const colorRef = useRef({});
  const initialColor = randomColor();
  

  const reload = () => {
    setObj({});
  };
  useEffect(async () => {
    const firebaseDoc = doc(db,"users",getUserID());
    const budgetList = await getDoc(firebaseDoc);
    // set for allPrice
    if (budgetList.exists()) {
      setCountList(isEmpty(budgetList.data().budgetList) ?  [
        {
          id: 1,
          color: "",
          name: "",
          price: 1,
          isNew: true,
        },
      ]:budgetList.data().budgetList)
    }
    
    // const price = await setDoc(doc(db,"users",getUserID()),{allPrice:allPrice,budgetList:budgetList});
  },[])
  useEffect(async () => {
    const allPrice = countList.reduce((a,b)=>{return a + b.price},0);
    setAllPrice(allPrice)
    //set for echart
    const chartDom = document.querySelector(".right-box");
    const myChart = echarts.init(chartDom);
    const colorList = countList
      .map((item) => item.color)
      .filter((item) => item);
      console.log(colorList,'colorLIst')
    myChart.setOption({
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      color: colorList.length ? colorList : ["#e0e0e0"], //Check the color with user or just greay.
      series: [
        {
          name: "Price Pie",
          type: "pie",
          radius: ["45%", "70%"], //size of chart
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "40",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: countList.map((item) => ({
            name: item.name,
            value: item.price,
          })),
        },
      ],
    });
  }, [countList]);

  function handleColorChange(id, color) {
    formRef.current.setFieldsValue({
      [`color_${id}`]: color,
    });
    reload();
  }

  function handlePushItem() {
    //+ for add a new data
    handleSave((state) => {
      let cloneList = cloneDeep(state);
      const ids = cloneList.map((item) => item.id).sort((a, b) => b - a); //sort the id and help to deal with data.
      cloneList.push({
        id: (ids[0] || 0) + 1,
        color: "",
        name: "",
        price: ids.length ? "" : 1,
        isNew: true,
      });
      setCountList(cloneList);
    });
  }

  async function handleSave(cb = () => {}) {
    //how to save data.
    //check if that is empty
    if (!formRef.current) return;
    //checking
    formRef.current.validateFields().then(async(data) => {
      //deal data with a for loop（color_1=>{id:1，name:"color",value:"#f00"}）
      let cl = cloneDeep(countList);
      for (let key in data) {
        const value = data[key];
        const splitArr = key.split("_");
        const id = splitArr[1];
        const name = splitArr[0];
        //From id to find the list
        cl.forEach((item, index) => {
          if (item.id == id) {
            cl[index] = {
              ...item,
              [name]: value,
              isNew: false,
            };
          }
        });
      }
      const allPrice = cl.reduce((a,b)=>{return a + b.price},0);
      const budgetList = await setDoc(doc(db,"users",getUserID()),{allPrice:allPrice,budgetList:cl});
      setCountList(cl);
      cb && cb(cl);
      
      
    });
  }

  function handleItemDelete(id) {
    setHandleDeleteId(id); //temp delete id
    formRef.current &&
      formRef.current.setFieldsValue({
        [`color_${id}`]: undefined,
        [`price_${id}`]: undefined,
        [`name_${id}`]: undefined,
      });
  }

  async function handleDeleteOk(id) {
    if (deleteAllFlag) {
      handleDeleteAll();
      return;
    }
    //delete the id
    const resultList = countList.filter((item) => item.id != id);
    setCountList(resultList);
    const allPrice = resultList.reduce((a,b)=>{return a + b.price},0);
    const budgetList = await setDoc(doc(db,"users",getUserID()),{allPrice:allPrice,budgetList:resultList});
    handleDeleteCancel();
  }

  function handleDeleteCancel() {
    //clean the temp id
    
    setHandleDeleteId(0);
  }
  const handleDeleteAll = async() => {
    setCountList([]);
    formRef.current && formRef.current.resetFields();
    setDeleteAllFlag(false);
    const budgetList = await setDoc(doc(db,"users",getUserID()),{allPrice:0,budgetList:[
      {
        id: 1,
        color: "",
        name: "",
        price: 1,
        isNew: true,
      },
    ]});
    setCountList([
      {
        id: 1,
        color: "",
        name: "",
        price: 1,
        isNew: true,
      },
    ])
    setHandleDeleteId();
    handleDeleteCancel();
  };

  const cityProps = (name) => ({
    value: cityObj[name],
    onChange: (value) => {
      setCityObj((prev) => ({ ...prev, [name]: value }));
    },
  });
  const numberChange = (rule, numberValue, callback) => {
    if (numberValue < 0) {
      // callback('please input positive number!')
      return Promise.reject(new Error("please input positive number!"));
    } else {
      return Promise.resolve();
    }
  };
  return (
    <div id="container">
      <Card.Grid className="left-box card">
        <Form
          ref={formRef}
          name="basic"
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
        >
          <div className="horizontal-center horizontal-center-add">
            <span className="newBtn btn box-shadow" onClick={handlePushItem}>
              {/*<PlusCircleOutlined style={{ fontSize: 20 }} />*/}
              Add
            </span>
          </div>
          <div className="list-container">
            <div className="color-list list-box">
              {/* color */}
              <List
                size="small"
                split={false}
                header={<> </>}
                dataSource={countList.map((item) => (
                  {
                  id: item.id,
                  color: item.color,
                  isNew: item.isNew,
                }))}
                renderItem={(item, index) => {
                  console.log(
                    "item",
                    item,
                    formRef.current && formRef.current.getFieldsValue()
                  );
                  return (
                    <List.Item>
                      <ColorPicker
                        //colorpicker, and the default color
                        color={
                          item.color ||
                          (formRef.current &&
                            formRef.current.getFieldValue(
                              `color_${item.id}`
                            )) ||
                          initialColor
                        }
                        onChange={handleColorChange.bind(null, item.id)}
                        disabled={!item.isNew}
                      />
                      {item.isNew && (
                        <Form.Item
                          name={`color_${item.id}`}
                          initialValue={item.color || initialColor}
                          rules={[
                            {
                              required: true,
                              message: "Please select lastest color!",
                            },
                          ]}
                          hidden
                        >
                          <Input />
                        </Form.Item>
                      )}
                    </List.Item>
                  );
                }}
              />
            </div>
            <div className="name-list list-box">
              {/* name */}
              <List
                size="small"
                split={false}
                header={<div className="horizontal-center">Name</div>}
                dataSource={countList.map((item) => ({
                  id: item.id,
                  name: item.name,
                  isNew: item.isNew,
                }))}
                renderItem={(item) => {
                  //show the new of the input data.
                  if (item.isNew) {
                    return (
                      <List.Item>
                        <Form.Item
                          name={`name_${item.id}`}
                          rules={[
                            {
                              required: true,
                              message: "Please input lastest name!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </List.Item>
                    );
                  }
                  return (
                    <List.Item>
                      <div
                        style={{
                          width: "100%",
                          height: "56px",
                          textAlign: "center",
                          lineHeight: "33px",
                        }}
                      >
                        {item.name}
                      </div>
                    </List.Item>
                  );
                }}
              />
            </div>
            <div className="price-list list-box">
              {/* $$$ */}
              <List
                size="small"
                header={<div className="horizontal-center">$$$</div>}
                split={false}
                dataSource={countList.map((item) => ({
                  id: item.id,
                  price: item.price,
                  isNew: item.isNew,
                }))}
                renderItem={(item) => {
                  //show the new of the input data.
                  if (item.isNew) {
                    return (
                      <List.Item>
                        <Form.Item
                          name={`price_${item.id}`}
                          rules={[
                            {
                              required: true,
                              message: "Please input lastest price!",
                            },
                            {
                              validator: numberChange,
                            },
                          ]}
                        >
                          <InputNumber />
                        </Form.Item>
                      </List.Item>
                    );
                  }
                  return (
                    <List.Item>
                      <div
                        style={{
                          width: "100%",
                          height: "56px",
                          textAlign: "center",
                          lineHeight: "33px",
                        }}
                      >
                        {item.price}
                      </div>
                    </List.Item>
                  );
                }}
              />
            </div>
            <div className="delete-list list-box">
              {/* delete */}
              <List
                size="small"
                header={
                  <div className="horizontal-center">
                    <CheckCircleFilled style={{ fontSize: 20, opacity: 0 }} />
                  </div>
                }
                split={false}
                dataSource={countList.map((item) => ({
                  id: item.id,
                  isNew: item.isNew,
                }))}
                renderItem={(item) => {
                  return (
                    <List.Item>
                      <div style={{ height: 49, marginTop: 8 }}>
                        <span
                          className="budget-delete-btn"
                          onClick={handleItemDelete.bind(
                            null,
                            item.id,
                            item.isNew
                          )}
                        >
                          X
                          {/*<CloseCircleOutlined style={{ fontSize: 20 }} />*/}
                        </span>
                      </div>
                    </List.Item>
                  );
                }}
              />
            </div>
          </div>
          <div className="button-container">
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <div style={{ height: 16 }} />
              <span
                className="doneBtn btn box-shadow"
                /*style={{
                  color: "#fff",
                  borderColor: "#a37cf0",
                  background: "#a37cf0",
                }}
                shape="round"*/
                onClick={handleSave}
              >
                Done
              </span>
              <span
                className="deleteAllBtn btn box-shadow"
                onClick={() => {
                  setDeleteAllFlag(true);
                  handleItemDelete("-1");
                }}
              >
                Delete All
              </span>
            </Form.Item>
          </div>
        </Form>
      </Card.Grid>
      <div className="medium-content">
        <div style={{ width: "100%", display: "flex" }}>
          State{" "}
          <Select
            showSearch
            placeholder="Select a city"
            optionFilterProp="children"
            onChange={(value) => {
              if (!value) {
                setCityObj({});
                return;
              }
              const item = cityMap[value];
              const newCityObj = {
                food: item.prop1,
                ticket: item.prop2,
                hotel: item.prop3,
              };
              setCityObj(newCityObj);
            }}
            // onSearch={onSearch}
            style={{ width: "60%", marginLeft: 20 }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {cityData.map((item) => (
              <Select.Option value={item.id}>{item.name}</Select.Option>
            ))}
          </Select>
        </div>
        {/* title  */}
        <h4 className="average-title"> Average daily expenses</h4>
        <div style={{ marginTop: 30, fontSize: "14px" }}>Average Food</div>
        <div style={{ fontSize: 14 }}>
          <div>
            <InputNumber
              addonBefore="$"
              placeholder="Average Food"
              style={{ width: "100%" }}
              {...cityProps("food")}
              disabled
            />
          </div>
          <div style={{ marginTop: 30 }}>Average Trafic</div>
          <div>
            <InputNumber
              addonBefore="$"
              placeholder="Average trafic"
              style={{ width: "100%" }}
              {...cityProps("ticket")}
              disabled
            />
          </div>
          <div style={{ marginTop: 30 }}>Average Hotel</div>
          <div>
            <InputNumber
              addonBefore="$"
              placeholder="Average Hotel"
              style={{ width: "100%" }}
              {...cityProps("hotel")}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="right-box"></div>

      <DeleteDialog
        // use handleDeleteId to boolean and check
        deleteAllFlag={deleteAllFlag}
        show={handleDeleteId}
        handleOk={handleDeleteOk.bind(null, handleDeleteId)}
        handleCancel={handleDeleteCancel}
      />
    </div>
  );
}

export default Index;
