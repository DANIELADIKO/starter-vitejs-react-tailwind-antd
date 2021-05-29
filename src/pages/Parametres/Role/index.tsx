import React, { useState } from "react";
import {
  Button,
  Divider,
  Drawer,
  Form,
  Input,
  Select,
  Popconfirm,
  Space,
  Table,
  Tooltip,
} from "antd";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import Role from "../../../utils/models/role.model";
import { format } from "date-fns";

import { AxiosResponse } from "axios";
import useRole from "../../../hooks/useRole";

interface Props {}

interface FProps {
  message: string;
  data: Role | undefined;
  
  onSuccess:(role: Role) => Promise<void>
  onFailed:(errorInfos: any) => void
}



const { Option } = Select;



// =============================================================

const formItemLayout = {
  labelCol: { span: 4},
  wrapperCol: { span: 20 },
};

const btnItemLayout = {
  wrapperCol: { span: 4 },
};




// =============================================================


/**
 * Fonction d'affichage de l'interface Role
 * @param props
 * @returns Interface Role
 */
function RoleScreen(props: Props) {
  const {
    liste_role,
    del_role,
    onFinish,
    onFinishFailed,

    showDrawer,
    onClose,
    actionTitle,
    selectedData,
    isDvisible,
    
  } = useRole();

  const { data, error } = liste_role;

  const columns = [
    {
      title: "Libellé",
      dataIndex: "rolename",
      key: "rolename",
    },
    {
      title: "Type",
      dataIndex: "roletype",
      key: "roletype",
    },
    {
      title: "Date de création",
      dataIndex: "roledatecreation",
      key: "roledatecreation",
      render: (text: string) => (
        <span>{format(new Date(text), "d-MMM-yyyy' 'HH:mm:ss")}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: Role, record: any) => (
        <Space size="middle">
          <Tooltip title="Modifier">
            <Button
              onClick={() => showDrawer(record)}
              className="grid place-items-center"
              icon={<AiOutlineEdit className="text-base" />}
            />
          </Tooltip>
          <Popconfirm
            title="Voulez vous supprimer ?"
            onConfirm={() => del_role(record)}
          >
            <Tooltip placement="bottom" title="Supprimer">
              <Button
                danger
                className="grid place-items-center"
                icon={<AiOutlineDelete className="text-base" />}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* BUTTON GROUPS */}
      <div className="">
        <Button onClick={() => showDrawer()}>Ajouter</Button>
      </div>
      <Divider />

      {/*  TABLE */}
      <Table size="small" dataSource={data?.data} columns={columns} />

      {/* DRAWER */}
      <Drawer
        title={actionTitle + " un role"}
        width={520}
        onClose={onClose}
        destroyOnClose={true}
        visible={isDvisible}
      >
        <RoleForm data={selectedData} onSuccess={onFinish} onFailed={onFinishFailed} message={actionTitle} />
      </Drawer>
    </>
  );
}

const RoleForm = (props: FProps) => {
  let { data, message, onSuccess, onFailed, } = props;


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Form
    {...formItemLayout}
      name="roleForm"
      initialValues={data}
      onFinish={onSuccess}
      onFinishFailed={onFailed}
    >
      <Form.Item
        label="Libellé"
        name="rolename"
        rules={[{ required: true, message: "Veuillez entrez un libellé !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Type"
        name="roletype"
        rules={[{ required: true, message: "Veuillez entrez un code!" }]}
      >
          <Select bordered={true}>
          <Option value="admin">Administrateur</Option>
          <Option value="client">Client</Option>
        </Select>
       
      </Form.Item>

      <Form.Item {...btnItemLayout}>
        <Button type="primary" htmlType="submit">
          {message}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RoleScreen;
