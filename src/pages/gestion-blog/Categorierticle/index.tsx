
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

import {Categoriearticle} from "../../../utils/models/categoriearticle.model";
import { format } from "date-fns";
import useCategorierticle from "../../../hooks/useCategorierticle";


interface Props {}

interface FProps {
  message: string;
  data: Categoriearticle | undefined;
  formHandler:any
  
}

const formItemLayout = {
  labelCol: { span: 6},
  wrapperCol: { span: 18 },
};

const btnItemLayout = {
  wrapperCol: { span: 4 },
};

/**
 * Fonction d'affichage de l'interface Categoriearticle
 * @param props
 * @returns Interface Categoriearticle
 */
function CategorierticleScreen(props: Props) {
  const {
    liste_categoriearticle,
    del_categoriearticle,
    formHandler,

    showDrawer,
    onClose,
    actionTitle,
    selectedData,
    isDvisible,
  } = useCategorierticle();

  const { data, error } = liste_categoriearticle;

  const columns = [
    {
      title: "Libellé",
      dataIndex: "categoriearticlelibelle",
      key: "categoriearticlelibelle",
    },
    {
      title: "Description",
      dataIndex: "categoriearticledescripition",
      key: "categoriearticledescripition",
    },
    {
      title: "Date de création",
      dataIndex: "categoriearticledatecreation",
      key: "categoriearticledatecreation",
      render: (text: string) => (
        <span>{format(new Date(text), "d-MMM-yyyy' 'HH:mm:ss")}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: Categoriearticle, record: any) => (
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
            onConfirm={() => del_categoriearticle(record)}
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
        title={actionTitle + " une categorie d'article"}
        width={520}
        onClose={onClose}
        destroyOnClose={true}
        visible={isDvisible}
      >
        <CategoriearticleForm data={selectedData} formHandler={formHandler} message={actionTitle} />
      </Drawer>
    </>
  );
}

const CategoriearticleForm = (props: FProps) => {
  let { data, message, formHandler } = props;

  

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Form
    {...formItemLayout}
      name="categoriearticleForm"
      initialValues={data}
      onFinish={formHandler("success")}
      onFinishFailed={formHandler("error")}
    >
     

      <Form.Item
        label="Libellé"
        name="categoriearticlelibelle"
        rules={[{ required: true, message: "Veuillez entrez un libellé !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Descripiton"
        name="categoriearticledescripition"
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

export default CategorierticleScreen;
