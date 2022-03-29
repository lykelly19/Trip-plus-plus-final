import React from "react";
import { Modal } from "antd";

function Index(props) {
  const {show,handleOk,handleCancel,...rest} = props;
  return (
    <Modal
      title="Confirm the deletion"
      visible={show}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Yes"
      cancelText="No"
      {...rest}
    >
      <p>Do you want to delete this data?</p>
    </Modal>
  );
}

export default Index;
