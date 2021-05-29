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
import { AiOutlineDelete, AiOutlineEdit, AiOutlineUpload } from "react-icons/ai";

import Typepropriete from "../../../utils/models/typepropriete.model";
import { format } from "date-fns";

import { AxiosResponse } from "axios";
import Upload, { RcFile } from "antd/lib/upload";
import { imgPath } from "../../../utils/helpers/img.helper";
import useTypepropriete from "../../../hooks/useTypepropriete";

interface Props {}

interface FProps {
  message: string;
  data: Typepropriete | undefined;

  imgUrl? : string;
  onSuccess:(banniere: Typepropriete) => Promise<void>
  onFailed:(errorInfos: any) => void
  beforeUpload:(file: RcFile, FileList: RcFile[]) => boolean
}

const { Option } = Select;

// =============================================================

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const btnItemLayout = {
  wrapperCol: { span: 4 },
};

// =============================================================

/**
 * Fonction d'affichage de l'interface Typepropriete
 * @param props
 * @returns Interface Typepropriete
 */
function TypeproprieteScreen(props: Props) {
  const {
    liste_typepropriete,
    del_typepropriete,
    onFinish,
    onFinishFailed,

    showDrawer,
    onClose,
    actionTitle,
    selectedData,
    isDvisible,
    beforeUpload,
    imgUrl
  } = useTypepropriete();

  const { data, error } = liste_typepropriete;

  const columns = [
    {
      title: "Libellé",
      dataIndex: "typeproprietelibelle",
      key: "typeproprietelibelle",
    },

    {
      title: "Descripiton",
      dataIndex: "typeproprietedescription",
      key: "typeproprietedescription",
    },
    {
      title: "Date de création",
      dataIndex: "typeproprietedatecreation",
      key: "typeproprietedatecreation",
      render: (text: string) => (
        <span>{format(new Date(text), "d-MMM-yyyy' 'HH:mm:ss")}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: Typepropriete, record: any) => (
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
            onConfirm={() => del_typepropriete(record)}
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
        title={actionTitle + " un type de propriete"}
        width={520}
        onClose={onClose}
        destroyOnClose={true}
        visible={isDvisible}
      >
        <TypeproprieteForm
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

const TypeproprieteForm = (props: FProps) => {
  let { data, message, onSuccess, onFailed,  beforeUpload, imgUrl } = props;

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Form
      {...formItemLayout}
      name="typeproprieteForm"
      initialValues={data}
      onFinish={onSuccess}
      onFinishFailed={onFailed}
    >
      <Form.Item
        label="Libellé"
        name="typeproprietelibelle"
        rules={[{ required: true, message: "Veuillez entrez un libellé !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Descripiton"
        name="typeproprietedescription"
        rules={[{ required: false, message: "Veuillez entrez un code!" }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>


      <Form.Item
        label="Image"
        name="typeproprieteicone"
        rules={[{ required: false, message: "Veuillez entrez un code!" }]}
      >
        <Upload
        name="typeproprieteicone"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
         beforeUpload={beforeUpload}
        // onChange={this.handleChange}
      >
        { imgUrl !=="" ? <img src={imgUrl} alt="Image" style={{ width: '100%' }} />   : data?.typeproprieteicone ? <img src={imgPath(data?.typeproprieteicone)} alt="Image" style={{ width: '100%' }} /> : <AiOutlineUpload  className="text-xl" />}
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

export default TypeproprieteScreen;
