import React from "react";
import { Modal } from "antd";

function Index(props) {
  const {show,handleOk, handleCancel , deleteAllFlag, ...rest} = props;
  return (
    <Modal
      title={deleteAllFlag?"Confirm the delete all":"Confirm the deletion"}
      visible={show}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Yes"
      cancelText="No"
      {...rest}
    >
      <p>{deleteAllFlag?"Do you want to delete all?":"Do you want to delete this data?"}</p>
    </Modal>
  );
}

export default Index;

