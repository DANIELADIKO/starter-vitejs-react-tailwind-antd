import React, { useState } from "react";
import {
  Button,
  Divider,
  Drawer,
  Form,
  Input,
  notification,
  Popconfirm,
  Space,
  Table,
  Tooltip,
} from "antd";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import Permission from "../../../utils/models/permission.model";
import { format } from "date-fns";
import usePermission from "../../../hooks/usePermission";

interface Props {}

interface FProps {
  message: string;
  data: Permission | undefined;
  type: number;
  onAdd:(permission: Permission) => Promise<void>
  onUpd:(permission: Permission) => Promise<void>
}

const formItemLayout = {
  labelCol: { span: 6},
  wrapperCol: { span: 18 },
};

const btnItemLayout = {
  wrapperCol: { span: 4 },
};

/**
 * Fonction d'affichage de l'interface Permission
 * @param props
 * @returns Interface Permission
 */
function PermissionScreen(props: Props) {
  const {
    liste_permission,
    del_permission,
    add_permission,
    upd_permission,

    showDrawer,
    onClose,
    actionTitle,
    selectedData,
    isDvisible,
    typeForm,
  } = usePermission();

  const { data, error } = liste_permission;

  const columns = [
    {
      title: "Libellé",
      dataIndex: "permissionlibelle",
      key: "permissionlibelle",
    },
    {
      title: "Code",
      dataIndex: "permissioncode",
      key: "permissioncode",
    },
    {
      title: "Date de création",
      dataIndex: "permissiondatecreation",
      key: "permissiondatecreation",
      render: (text: string) => (
        <span>{format(new Date(text), "d-MMM-yyyy' 'HH:mm:ss")}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: Permission, record: any) => (
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
            onConfirm={() => del_permission(record)}
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
        title={actionTitle + " un permission"}
        width={520}
        onClose={onClose}
        destroyOnClose={true}
        visible={isDvisible}
      >
        <PermissionForm data={selectedData} type={typeForm} onAdd={add_permission} onUpd={upd_permission} message={actionTitle} />
      </Drawer>
    </>
  );
}

const PermissionForm = (props: FProps) => {
  let { data, message, type, onAdd, onUpd } = props;

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    let permission: Permission = data as Permission;
    permission =  {...permission, ...values} 

    if (type === 0) {
      // Add
      await onAdd(permission)
    } else {
      await onUpd(permission)
    }

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Form
    {...formItemLayout}
      name="permissionForm"
      initialValues={data}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
     

      <Form.Item
        label="Libellé"
        name="permissionlibelle"
        rules={[{ required: true, message: "Veuillez entrez un libellé !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Code"
        name="permissioncode"
        rules={[{ required: true, message: "Veuillez entrez un code!" }]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item
        label="Descripiton"
        name="permissioncode"
        rules={[{ required: true, message: "Veuillez entrez un code!" }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item> */}

      <Form.Item {...btnItemLayout}>
        <Button type="primary" htmlType="submit">
          {message}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PermissionScreen;
