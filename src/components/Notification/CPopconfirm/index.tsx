import { Popconfirm } from "antd";
import React from "react";

interface Props {
  title: string;
  confirm: () => void;
  cancel?: () => void;
  children: React.ReactNode
}

const CPopconfirm = ({title,confirm,cancel,children}: Props) => {
  return (
    <Popconfirm
      title={title}
      onConfirm={confirm}
      onCancel={cancel ? cancel : () => {}}
      okText="Oui"
      cancelText="Non"
    >
    {children}
    </Popconfirm>
  );
};

export default CPopconfirm;
