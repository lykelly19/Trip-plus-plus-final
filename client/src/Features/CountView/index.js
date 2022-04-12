import React from "react";
import "./index.css";
import { Card, List, Form, Input, Button, InputNumber, Select} from "antd";
import {PlusCircleOutlined, CheckCircleFilled, CloseCircleOutlined} from "@ant-design/icons"
import ColorPicker from "./ColorPicker";
import DeleteDialog from "./DeleteDialog";
import { cloneDeep } from "lodash";
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import cityData from './data.json';
const { useState, useEffect, useRef } = React;


const cityMap = {};
for(let item of cityData){
  cityMap[item.id] = item;
}
//For echarts
echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);
function randomColor() {
  var color = "#";
  //random get 0-15 and use tostring (16) in to color
  for (var i = 0; i < 6; i++) color+=parseInt(Math.random() * 16).toString(16);
  return color;
}
function Index() {
  const [countList, setCountList] = useState([{
    id: 1,
    color: "",
    name: "",
    price: 1,
    isNew: true,
  }]); //for the left input data{id:1,color:"",name:"",price:"",isNew:false}
  const [handleDeleteId, setHandleDeleteId] = useState(); //For Delete button
  const [obj, setObj] = useState();
  const [deleteAllFlag, setDeleteAllFlag] = useState(false);  
  const [cityObj, setCityObj] = useState({});
  const formRef = useRef();
  const colorRef = useRef({});
  const initialColor = randomColor();

  const reload = ()=>{
    setObj({});
  }
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
    reload();
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
    if(deleteAllFlag){
      handleDeleteAll();
      return;
    }
    //delete the id
    const resultList = countList.filter(item=>item.id != id);
    setCountList(resultList);
    handleDeleteCancel();
  }

  function handleDeleteCancel() { 
    //clean the temp id
    setHandleDeleteId(0);
  }
  const handleDeleteAll =()=>{
    setCountList([]);
    formRef.current && formRef.current.resetFields();
    setDeleteAllFlag(false);
    setHandleDeleteId();
    handleDeleteCancel();
  }
  console.log('cityObj',cityObj)
  const cityProps = (name) =>({
    value: cityObj[name],
    onChange: (value)=>{
      setCityObj((prev)=>({...prev,[name]:value}))
    }
  });
  console.log('countList',countList)
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
                renderItem={(item,index) => {
                  console.log('item',item,formRef.current&&formRef.current.getFieldsValue())
                  return (
                    <List.Item>
                      <ColorPicker
                        //colorpicker, and the default color
                        color={item.color || (formRef.current && formRef.current.getFieldValue(`color_${item.id}`))||initialColor}
                        onChange={handleColorChange.bind(null, item.id)}
                        disabled={!item.isNew}
                      />
                      {
                        item.isNew &&
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
              <Button style={{color:'#fff',borderColor:'#a37cf0',background:'#a37cf0'}} shape='round' onClick={handleSave}>
                Finish
              </Button>
              <Button type="danger" onClick={()=>{
                setDeleteAllFlag(true);
                handleItemDelete('-1');
              }} style={{marginLeft:10}} shape='round'>
                Delete All
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card.Grid>
      <div className="medium-content">
        <div style={{width: '100%',display: 'flex'}}>State <Select
                    showSearch
                    placeholder="Select a city"
                    optionFilterProp="children"
                    onChange={(value)=>{
                      console.log('value',value);
                      if(!value){
                        setCityObj({});
                        return;
                      }
                      const item = cityMap[value];
                      const newCityObj = {
                        food: item.prop1,
                        ticket: item.prop2,
                        hotel: item.prop3,
                      }
                      setCityObj(newCityObj);
                    }}
                    // onSearch={onSearch}
                    style={{width:'60%',marginLeft:20}}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {cityData.map(item=><Select.Option value={item.id}>
                      {item.name}
                    </Select.Option>)}
                  </Select>
        </div>
        <div style={{marginTop:30}}>Average Food 
        </div>
        <div style={{fontSize:14}}>
          <div>
            <InputNumber placeholder="Average Food"  style={{width:'100%'}} {...cityProps('food')}/>
          </div>
          <div style={{marginTop:30}}>Average Ticket
          </div>
          <div>
            <InputNumber placeholder="Average Ticket"  style={{width:'100%'}} {...cityProps('ticket')}/>
          </div>
          <div style={{marginTop:30}}>Average Hotel
          </div>
          <div>
            <InputNumber placeholder="Average Hotel"  style={{width:'100%'}} {...cityProps('hotel')}/>
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
