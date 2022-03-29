import React from "react";
import "./index.css";
import { Card, List, Form, Input, Button, InputNumber } from "antd";
import {PlusCircleOutlined, CheckCircleFilled, CloseCircleOutlined} from "@ant-design/icons"
import ColorPicker from "./ColorPicker";
import DeleteDialog from "./DeleteDialog";
import { cloneDeep } from "lodash";
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
const { useState, useEffect, useRef } = React;

//For echarts
echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

function Index() {
  const [countList, setCountList] = useState([{
    id: 1,
    color: "",
    name: "",
    price: 1,
    isNew: true,
  }]); //for the left input data{id:1,color:"",name:"",price:"",isNew:false}
  const [handleDeleteId, setHandleDeleteId] = useState(); //For Delete button
  const formRef = useRef();

  useEffect(() => {
    //set for echart
    const chartDom = document.querySelector('.right-box');
    const myChart = echarts.init(chartDom);
    const colorList = countList.map(item=>item.color).filter(item=>item);
    myChart.setOption( {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      color: colorList.length ? colorList : ['#e0e0e0'], //Check the color with user or just greay.
      series: [
        {
          name: 'Price Pie',
          type: 'pie',
          radius: ['45%', '70%'], //size of chart
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: countList.map(item=>({name:item.name,value:item.price}))
        }
      ]
    })
  }, [countList]);

  function handleColorChange(id, color) {
    formRef.current.setFieldsValue({
      [`color_${id}`]: color,
    });
  }

  function handlePushItem() {
    //+ for add a new data
    handleSave((state)=>{
      let cloneList = cloneDeep(state);
      const ids = cloneList.map(item=>item.id).sort((a,b)=>b-a); //sort the id and help to deal with data.
      cloneList.push({
        id: (ids[0] || 0)+1,
        color: "",
        name: "",
        price: ids.length?"":1,
        isNew: true,
      })
      setCountList(cloneList)
    });
  }

  async function handleSave(cb=()=>{}) {
    //how to save data.
    //check if that is empty
    if (!formRef.current) return;
    //checking
    formRef.current.validateFields().then(data=>{
      //deal data with a for loop（color_1=>{id:1，name:"color",value:"#f00"}）
      let cl = cloneDeep(countList);
      for (let key in data) {
        const value = data[key];
        const splitArr = key.split('_')
        const id = splitArr[1];
        const name = splitArr[0]
        //From id to find the list
        cl.forEach((item,index)=>{
          if (item.id==id) {
            cl[index] = {
              ...item,
              [name]: value,
              isNew: false
            }
          }
        })
      }
      setCountList(cl);
      cb && cb(cl);
    })
  }

  function handleItemDelete(id) {
    setHandleDeleteId(id); //temp delete id
    formRef.current && formRef.current.setFieldsValue({
      [`color_${id}`]:undefined,
      [`price_${id}`]:undefined,
      [`name_${id}`]:undefined,
    })
  }

  function handleDeleteOk(id) {
    //delete the id
    const resultList = countList.filter(item=>item.id != id);
    setCountList(resultList);
    handleDeleteCancel();
  }

  function handleDeleteCancel() { 
    //clean the temp id
    setHandleDeleteId(0);
  }
  return (
    <div id="container">
      <Card.Grid className="left-box">
        <Form
          ref={formRef}
          name="basic"
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
        >
          <div className="list-container">
            <div className="color-list list-box">
              {/* color */}
              <List
                size="small"
                split={false}
                header={<div className="horizontal-center"><span onClick={handlePushItem}><PlusCircleOutlined style={{"fontSize":20}}/></span></div>}
                dataSource={countList.map((item) => ({
                  id: item.id,
                  color: item.color,
                  isNew: item.isNew,
                }))}
                renderItem={(item) => {
                  console.log(item.color);
                  return (
                    <List.Item>
                      <ColorPicker
                        //colorpicker, and the default color
                        color={item.color || (formRef.current && formRef.current.getFieldValue(`color_${item.id}`))}
                        onChange={handleColorChange.bind(null, item.id)}
                        disabled={!item.isNew}
                      />
                      {
                        item.isNew &&
                        <Form.Item
                        name={`color_${item.id}`}
                        initialValue={item.color || "#44cef6"}
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
                      }
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
                  return <List.Item><div style={{height:56}}>{item.name}</div></List.Item>;
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
                          ]}
                        >
                          <InputNumber />
                        </Form.Item>
                      </List.Item>
                    );
                  }
                  return <List.Item><div style={{height:56}}>{item.price}</div></List.Item>;
                }}
              />
            </div>
            <div className="delete-list list-box">
              {/* delete */}
              <List
                size="small"
                header={<div className="horizontal-center"><CheckCircleFilled style={{"fontSize":20,"opacity":0}}/></div>}
                split={false}
                dataSource={countList.map((item) => ({
                  id: item.id,
                  isNew: item.isNew,
                }))}
                renderItem={(item) => {
                  return <List.Item>
                      <div style={{height:56,marginTop:2}}>
                        <span onClick={handleItemDelete.bind(null, item.id, item.isNew)}>
                          <CloseCircleOutlined style={{fontSize:20}}/>
                        </span>
                      </div>
                    </List.Item>;
                }}
              />
            </div>
          </div>
          <div className="button-container">
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <div style={{ height: 16 }} />
              <Button type="primary" onClick={handleSave}>
                Finish
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card.Grid>
      <div className="right-box"></div>

      <DeleteDialog
        // use handleDeleteId to boolean and check
        show={handleDeleteId}
        handleOk={handleDeleteOk.bind(null, handleDeleteId)}
        handleCancel={handleDeleteCancel}
      />
    </div>
  );
}

export default Index;
