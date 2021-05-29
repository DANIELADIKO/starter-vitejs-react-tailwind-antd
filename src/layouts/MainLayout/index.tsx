import React, { Suspense } from "react";
import "./index.scss";

import { Layout } from "antd";
import AContent from "../../components/layouts/AContent";
import AHeader from "../../components/layouts/AHeader";
import ASidebar from "../../components/layouts/ASidebar";
import { createProtectedRoute, createRoute } from "../../core/helpers/route.helper";
import { Redirect, Switch } from "react-router-dom";

import routes from "../../routes/page-nav";
import { createMenu } from "../../core/helpers/menu.helper";
const { Footer } = Layout;

interface Props {}

const MainLayout = (props: Props) => {
  return (
    <Layout>
      {/* SIDEBAR */}
      <ASidebar icon={"VONE"} >
      {routes.map((route, idx) => createMenu(route, idx, '/app'))}
      </ASidebar>
      {/* SIDEBAR */}

      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <AHeader />
        <AContent>
          <Suspense fallback={"lorem"}>
            <Switch>
              {routes.map((route, idx) => {
                return createProtectedRoute(route, idx, "/app");
              })}
              <Redirect to="/404" />
            </Switch>
          </Suspense>
        </AContent>

        <Footer style={{ textAlign: "center" }}>
          Vone ©2021 Created With Ant.D By KSE
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
