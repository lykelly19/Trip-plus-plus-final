import React from "react";
import { SketchPicker } from "react-color";
import "./index.css";
import { Modal } from "antd";

const { useState } = React;
function Index(props) {
  const [color, setColor] = useState("#44cef6");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    const { disabled } = props;
    if (!disabled) {
      setIsModalVisible(true);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleColorChange = (color) => {
    const { hex } = color;
    setColor(hex);
    props.onChange(hex);
  };
  return (
    <div
      className="color-picker"
      data-bs-toggle="tooltip"
      title="click here to change the color"
    >
      <span
        className="outer-color"
        style={{ backgroundColor: props.color || color }}
        onClick={showModal}
      />
      <Modal
        title="Select the colour"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <SketchPicker
          {...props}
          onChange={handleColorChange}
          width="100%"
          color={props.color || color}
        />
      </Modal>
    </div>
  );
}

export default Index;
