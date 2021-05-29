import React, { useState } from "react";
import {
  Button,
  Divider,
  Drawer,
  Form,
  Input,
  notification,
  Popconfirm,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Typeauth from "../../../utils/models/typeauth.model";
import { format } from "date-fns";
import { AxiosResponse } from "axios";
import useTypeauth from "../../../hooks/useTypeauth";


const { Option } = Select;
interface Props {}

interface FProps {
  message: string;
  data: Typeauth | undefined;
  type: number;
  onAdd: (typeauth: Typeauth) => Promise<void>;
  onUpd: (typeauth: Typeauth) => Promise<void>;
}

const Context = React.createContext({ name: "Default" });

/**
 * Fonction d'affichage de l'interface Typeauth
 * @param props
 * @returns Interface Typeauth
 */
function TypeauthScreen(props: Props) {
  const {
    liste_typeauth,
    del_typeauth,
    add_typeauth,
    upd_typeauth,

    showDrawer,
    onClose,
    actionTitle,
    selectedData,
    isDvisible,
    typeForm,
  } = useTypeauth();

  const { data, error } = liste_typeauth;

  const columns = [
    {
      title: "Libellé",
      dataIndex: "modeauthentificationlibelle",
      key: "modeauthentificationlibelle",
    },
    {
      title: "Statut",
      dataIndex: "modeauthentificationstatus",
      key: "modeauthentificationstatus",
    },
    {
      title: "Description",
      dataIndex: "modeauthentificationdescription",
      key: "modeauthentificationdescription",
    },
    {
      title: "Date de création",
      dataIndex: "modeauthdatecreation",
      key: "modeauthdatecreation",
      render: (text: string) => (
        <span>{format(new Date(text), "d-MMM-yyyy' 'HH:mm:ss")}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: Typeauth, record: any) => (
        <Space size="middle">
          <Tooltip title="Modifier">
            <Button
              onClick={() => showDrawer(record)}
              className="grid place-items-center"
              icon={<AiOutlineEdit className="text-base" />}
            />
          </Tooltip>
          {/* <Popconfirm
            title="Voulez vous supprimer ?"
            onConfirm={() => del_typeauth(record)}
          >
            <Tooltip placement="bottom" title="Supprimer">
              <Button
                danger
                className="grid place-items-center"
                icon={<AiOutlineDelete className="text-base" />}
              />
            </Tooltip>
          </Popconfirm> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* BUTTON GROUPS */}
      <div className="">
        {/* <Button onClick={() => showDrawer()}>Ajouter</Button> */}
      </div>
      <Divider />

      {/*  TABLE */}
      <Table size="small" dataSource={data?.data} columns={columns} />

      {/* DRAWER */}
      <Drawer
        title={actionTitle + " un Mode d'authentification"}
        width={520}
        onClose={onClose}
        destroyOnClose={true}
        visible={isDvisible}
      >
        <TypeauthForm
          data={selectedData}
          type={typeForm}
          onAdd={add_typeauth}
          onUpd={upd_typeauth}
          message={actionTitle}
        />
      </Drawer>
    </>
  );
}

const TypeauthForm = (props: FProps) => {
  let { data, message, type, onAdd, onUpd } = props;

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    let typeauth: Typeauth = data as Typeauth;
    typeauth = { ...typeauth, ...values };
    console.log(typeauth);
    
    if (type === 0) {
      // Add
      await onAdd(typeauth);
    } else {
      await onUpd(typeauth);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Form
      name="typeauthForm"
      initialValues={data}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Statut"
        name="modeauthentificationstatus"
        rules={[
          { required: true, message: "Veuillez selectionner un Statut !" },
        ]}
      >
        <Select bordered={true}>
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>
      </Form.Item>

      {/* <Form.Item
        label="Typeauth"
        name="typeauthcode"
        rules={[{ required: true, message: "Veuillez entrez un code!" }]}
      >
        <Input />
      </Form.Item> */}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {message}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TypeauthScreen;
