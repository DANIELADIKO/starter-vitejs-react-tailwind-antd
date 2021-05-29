import React, { ReactElement } from "react";
import { Layout, Menu } from "antd";

const { Sider } = Layout;
interface Props {
  children:any,
  icon:ReactElement|string
}


//
// FONCTION DE CREATION DE LA SIDEBAR
//
const ASidebar = (props: Props) => {
  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        backgroundColor: "#2978b5",
      }}
    >
      <div className="logo text-2xl text-center p-5 text-white">
        {props.icon}
      </div>
      <Menu
        multiple={false}
        theme="dark"
        style={{ backgroundColor: "#2978b5" }}
        mode="vertical"
      >
       {props.children}
      </Menu>
    </Sider>
  );
};

export default ASidebar;
