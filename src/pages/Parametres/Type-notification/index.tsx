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
import Typenotification from "../../../utils/models/typenotification.model";
import { format } from "date-fns";
import { AxiosResponse } from "axios";
import useTypenotification from "../../../hooks/useTypenotification";


const { Option } = Select;
interface Props {}

interface FProps {
  message: string;
  data: Typenotification | undefined;
  type: number;
  onAdd: (typenotification: Typenotification) => Promise<void>;
  onUpd: (typenotification: Typenotification) => Promise<void>;
}

const Context = React.createContext({ name: "Default" });

/**
 * Fonction d'affichage de l'interface Typenotification
 * @param props
 * @returns Interface Typenotification
 */
function TypenotificationScreen(props: Props) {
  const {
    liste_typenotification,
    del_typenotification,
    add_typenotification,
    upd_typenotification,

    showDrawer,
    onClose,
    actionTitle,
    selectedData,
    isDvisible,
    typeForm,
  } = useTypenotification();

  const { data, error } = liste_typenotification;

  const columns = [
    {
      title: "Libellé",
      dataIndex: "typenotificationlibelle",
      key: "typenotificationlibelle",
    },
    {
      title: "Statut",
      dataIndex: "typenotificationstatus",
      key: "typenotificationstatus",
    },
    {
      title: "Description",
      dataIndex: "typenotificationdescripiton",
      key: "typenotificationdescripiton",
    },
    {
      title: "Date de création",
      dataIndex: "typenotificationdatecreation",
      key: "typenotificationdatecreation",
      render: (text: string) => (
        <span>{format(new Date(text), "d-MMM-yyyy' 'HH:mm:ss")}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: Typenotification, record: any) => (
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
            onConfirm={() => del_typenotification(record)}
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
        <TypenotificationForm
          data={selectedData}
          type={typeForm}
          onAdd={add_typenotification}
          onUpd={upd_typenotification}
          message={actionTitle}
        />
      </Drawer>
    </>
  );
}

const TypenotificationForm = (props: FProps) => {
  let { data, message, type, onAdd, onUpd } = props;

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    let typenotification: Typenotification = data as Typenotification;
    typenotification = { ...typenotification, ...values };
    console.log(typenotification);
    
    if (type === 0) {
      // Add
      await onAdd(typenotification);
    } else {
      await onUpd(typenotification);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Form
      name="typenotificationForm"
      initialValues={data}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Statut"
        name="typenotificationstatus"
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
        label="Typenotification"
        name="typenotificationcode"
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

export default TypenotificationScreen;
