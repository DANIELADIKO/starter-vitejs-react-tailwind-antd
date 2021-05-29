import React from "react";
import { Layout, PageHeader, Breadcrumb } from "antd";
import {
  useLocation,
} from "react-router-dom";
import routes from "../../../routes/page-nav";
import { createBreadCrumb } from "../../../core/helpers/breadcrump.helper";
const { Content } = Layout;

interface Props {
  location?: any;
  children: any;
}

const AContent = (props: Props) => {
  const { pathname } = useLocation();
  const { breadcrumbItems, pageInfos } = createBreadCrumb(
    routes,
    pathname,
    "/app"
  );

  return (
    <Content
      style={{
        margin: "10px 25px 0",
        overflow: "none",
        minHeight: "calc(100vh - 150px)",
      }}
    >
      <div className="grid grid-cols-3 gap-4 justify-end">
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
      </div>

      <PageHeader
        className="site-page-header"
        title={pageInfos && pageInfos.name}
        subTitle={`Bienvenu sur l'interface ${pageInfos && pageInfos.name}`}
      />

      <div className="site-layout-background" style={{ padding: 20 }}>
        {props.children}
      </div>
    </Content>
  );
};

export default AContent;
