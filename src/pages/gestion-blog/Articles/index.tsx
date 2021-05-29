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
import { Article } from "../../../utils/models/article.model";
import { format } from "date-fns";
import useArticle from "../../../hooks/useArticle";

interface Props {}

interface FProps {
  message: string;
  data: Article | undefined;
  formHandler: any;
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const btnItemLayout = {
  wrapperCol: { span: 4 },
};

/**
 * Fonction d'affichage de l'interface Article
 * @param props
 * @returns Interface Article
 */
function ArticleScreen(props: Props) {
  const {
    liste_article,
    del_article,
    formHandler,

    showDrawer,
    onClose,
    actionTitle,
    selectedData,
    isDvisible,
  } = useArticle();

  const { data, error } = liste_article;

  const columns = [
    {
      title: "Libellé",
      dataIndex: "articlelibelle",
      key: "articlelibelle",
    },
    {
      title: "Description",
      dataIndex: "articledescripition",
      key: "articledescripition",
    },
    {
      title: "Date de création",
      dataIndex: "articledatecreation",
      key: "articledatecreation",
      render: (text: string) => (
        <span>{format(new Date(text), "d-MMM-yyyy' 'HH:mm:ss")}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: Article, record: any) => (
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
            onConfirm={() => del_article(record)}
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
        <ArticleForm
          data={selectedData}
          formHandler={formHandler}
          message={actionTitle}
        />
      </Drawer>
    </>
  );
}

const ArticleForm = (props: FProps) => {
  let { data, message, formHandler } = props;
  
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Form
      {...formItemLayout}
      name="articleForm"
      initialValues={data}
      onFinish={formHandler("success")}
      onFinishFailed={formHandler("error")}
    >
      <Form.Item
        label="Libellé"
        name="articlelibelle"
        rules={[{ required: true, message: "Veuillez entrez un libellé !" }]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item
        label="Descripiton"
        name="articledescripition"
        rules={[{ required: false, message: "Veuillez entrez un code!" }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item> */}
      <div >
       
      </div>
      <Form.Item {...btnItemLayout}>
        <Button type="primary" htmlType="submit">
          {message}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ArticleScreen;
