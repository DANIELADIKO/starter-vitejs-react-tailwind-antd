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

import Typepay from "../../../utils/models/typepay.model";
import { format } from "date-fns";
import useTypepay from "../../../hooks/useTypepay";


interface Props {}

interface FProps {
  message: string;
  data: Typepay | undefined;
  type: number;
  onAdd:(typepay: Typepay) => Promise<void>
  onUpd:(typepay: Typepay) => Promise<void>
}

const formItemLayout = {
  labelCol: { span: 6},
  wrapperCol: { span: 18 },
};

const btnItemLayout = {
  wrapperCol: { span: 4 },
};

/**
 * Fonction d'affichage de l'interface Typepay
 * @param props
 * @returns Interface Typepay
 */
function TypepayScreen(props: Props) {
  const {
    liste_typepay,
    del_typepay,
    add_typepay,
    upd_typepay,

    showDrawer,
    onClose,
    actionTitle,
    selectedData,
    isDvisible,
    typeForm,
  } = useTypepay();

  const { data, error } = liste_typepay;

  const columns = [
    {
      title: "Libellé",
      dataIndex: "modepaiementlibelle",
      key: "modepaiementlibelle",
    },
    {
      title: "Description",
      dataIndex: "modepaiementdescription",
      key: "modepaiementdescription",
    },
    {
      title: "Date de création",
      dataIndex: "modepaiementdatecreation",
      key: "modepaiementdatecreation",
      render: (text: string) => (
        <span>{format(new Date(text), "d-MMM-yyyy' 'HH:mm:ss")}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: Typepay, record: any) => (
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
            onConfirm={() => del_typepay(record)}
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
        title={actionTitle + " un typepay"}
        width={520}
        onClose={onClose}
        destroyOnClose={true}
        visible={isDvisible}
      >
        <TypepayForm data={selectedData} type={typeForm} onAdd={add_typepay} onUpd={upd_typepay} message={actionTitle} />
      </Drawer>
    </>
  );
}

const TypepayForm = (props: FProps) => {
  let { data, message, type, onAdd, onUpd } = props;

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    let typepay: Typepay = data as Typepay;
    typepay =  {...typepay, ...values} 

    if (type === 0) {
      // Add
      await onAdd(typepay)
    } else {
      await onUpd(typepay)
    }

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Form
    {...formItemLayout}
      name="typepayForm"
      initialValues={data}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
     

      <Form.Item
        label="Libellé"
        name="modepaiementlibelle"
        rules={[{ required: true, message: "Veuillez entrez un libellé !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Descripiton"
        name="modepaiementdescription"
        rules={[{ required: false, message: "Veuillez entrez un code!" }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item {...btnItemLayout}>
        <Button type="primary" htmlType="submit">
          {message}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TypepayScreen;
