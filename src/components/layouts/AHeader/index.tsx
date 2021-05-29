import React from "react";
import { UserOutlined } from '@ant-design/icons';
import { AiOutlineUser, AiOutlineBell } from "react-icons/ai";
import { Avatar, Badge, Button, Dropdown, Layout, Menu, Space } from "antd";
import { logout } from "../../../core/objects/Auth";
const { Header } = Layout;

interface Props {}

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="#">Profil</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="#">Parametres</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" onClick={() => logout()}>Deconnexion</Menu.Item>
  </Menu>
);

const AHeader = (props: Props) => {
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <div className="h-full grid grid-cols-5 md:grid-cols-12 p-0 shadow-sm">
        <div className="w-20 flex col-start-12 h-full">
       
          <button className="pt-2">
          <Badge count={0} showZero>
            <AiOutlineBell className="text-xl" />
          </Badge>
          </button>
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              className="ant-dropdown-link ml-6"
              onClick={(e) => e.preventDefault()}
            >
              <Avatar style={{ backgroundColor: '#87d068' }} className="text-center" >
              <UserOutlined className="text-lg" />
              </Avatar>
                
            </a>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default AHeader;
