import React from "react";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import IRoute from "../../core/objects/IRoute";
import { Link } from "react-router-dom";

//
// FONCTION DE CREATION DES ITEM DE MENU
//

export const createMenu = (
  route: IRoute,
  ind: number | string,
  parent: string = ""
) => {
  if (route.children && route.children.length > 0) {
    return (
      <SubMenu key={ind} title={route.name}>
        {route.children.map((i_route, idx) =>
          createMenu(i_route, `${ind}${idx}`, `${parent}${route.path}`)
        )}
      </SubMenu>
    );
  } else {
    return (
      <Menu.Item key={ind} >
        <Link to={`${parent}${route.path}`}>{route.name} </Link>
      </Menu.Item>
    );
  }
};