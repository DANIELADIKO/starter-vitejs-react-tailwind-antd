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
  Upload,
} from "antd";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineUpload,
} from "react-icons/ai";
import { imgPath } from "../../../utils/helpers/img.helper";

import Banniere from "../../../utils/models/banniere.model";
import { format } from "date-fns";

import useBanniere from "../../../hooks/useBanniere";
import { RcFile } from "antd/lib/upload";

// =============================================================

interface Props {}

interface FProps {
  message: string;
  data: Banniere | undefined;
  type?: number;
  imgUrl?: string;
  onSuccess: (banniere: Banniere) => Promise<void>;
  onFailed: (errorInfos: any) => void;
  beforeUpload: (file: RcFile, FileList: RcFile[]) => boolean;
}

// =============================================================

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const btnItemLayout = {
  wrapperCol: { span: 4 },
};

// =============================================================

/**
 * Fonction d'affichage de l'interface Banniere
 * @param props
 * @returns Interface Banniere
 */
function BanniereScreen(props: Props) {
  const {
    liste_banniere,
    del_banniere,
    onFinish,
    onFinishFailed,

    showDrawer,
    onClose,
    actionTitle,
    selectedData,
    isDvisible,
    beforeUpload,
    imgUrl,
  } = useBanniere();

  const { data, error } = liste_banniere;

  const columns = [
    {
      title: "Libellé",
      dataIndex: "bannierename",
    },
    {
      title: "Description",
      dataIndex: "bannieredescription",
    },
    {
      title: "Date de création",
      dataIndex: "bannieredatecreation",

      render: (text: string) => (
        <span>{format(new Date(text), "d-MMM-yyyy' 'HH:mm:ss")}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: Banniere, record: any) => (
        <div className="p-0 m-0 grid place-items-start">
          <Space size="small" className="">
            <Tooltip title="Modifier">
              <Button
                size="middle"
                onClick={() => showDrawer(record)}
                className="grid place-items-center"
                icon={<AiOutlineEdit className="text-base" />}
              />
            </Tooltip>
            <Popconfirm
              title="Voulez vous supprimer ?"
              onConfirm={() => del_banniere(record)}
            >
              <Tooltip placement="bottom" title="Supprimer">
                <Button
                  danger
                  size="middle"
                  className="grid place-items-center"
                  icon={<AiOutlineDelete className="text-base" />}
                />
              </Tooltip>
            </Popconfirm>
          </Space>
        </div>
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
        title={actionTitle + " une banniere"}
        width={520}
        onClose={onClose}
        destroyOnClose={true}
        visible={isDvisible}
      >
        <BanniereForm
          data={selectedData}
          imgUrl={imgUrl}
          onSuccess={onFinish}
          onFailed={onFinishFailed}
          beforeUpload={beforeUpload}
          message={actionTitle}
        />
      </Drawer>
    </>
  );
}

// =============================================================

const BanniereForm = (props: FProps) => {
  let { data, message, onSuccess, onFailed, beforeUpload, imgUrl } = props;

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Form
      {...formItemLayout}
      name="banniereForm"
      initialValues={data}
      onFinish={onSuccess}
      onFinishFailed={onFailed}
    >
      <Form.Item
        label="Libellé"
        name="bannierename"
        rules={[{ required: true, message: "Veuillez entrez un libellé !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Descripiton"
        name="bannieredescription"
        rules={[{ required: false, message: "Veuillez entrez un code!" }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item
        label="Image"
        name="banniereimage"
        rules={[{ required: false, message: "Veuillez entrez un code!" }]}
      >
        <Upload
          name="banniereimage"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          // onChange={this.handleChange}
        >
          {imgUrl !== "" ? (
            <img src={imgUrl} alt="Image" style={{ width: "100%" }} />
          ) : data?.banniereimage ? (
            <img
              src={imgPath(data?.banniereimage)}
              alt="Image"
              style={{ width: "100%" }}
            />
          ) : (
            <AiOutlineUpload className="text-xl" />
          )}
        </Upload>
      </Form.Item>

      <Form.Item {...btnItemLayout}>
        <Button type="primary" htmlType="submit">
          {message}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BanniereScreen;
