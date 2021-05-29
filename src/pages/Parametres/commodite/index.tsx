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

import Commodite from "../../../utils/models/commodite.model";
import { format } from "date-fns";

import { AxiosResponse } from "axios";
import useCommodite from "../../../hooks/useCommodite";

interface Props {}

interface FProps {
  message: string;
  data: Commodite | undefined;

  onSuccess: (commodite: Commodite) => Promise<void>;
  onFailed: (errorInfos: any) => void;
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
 * Fonction d'affichage de l'interface Commodite
 * @param props
 * @returns Interface Commodite
 */
function CommoditeScreen(props: Props) {
  const {
    liste_commodite,
    del_commodite,
    onFinish,
    onFinishFailed,

    showDrawer,
    onClose,
    actionTitle,
    selectedData,
    isDvisible,
  } = useCommodite();

  const { data, error } = liste_commodite;

  const columns = [
    {
      title: "Libellé",
      dataIndex: "commoditelibelle",
      key: "commoditelibelle",
    },
    {
      title: "Description",
      dataIndex: "commoditedescription",
      key: "commoditedescription",
    },
    {
      title: "Date de création",
      dataIndex: "commoditedatecreation",
      key: "commoditedatecreation",
      render: (text: string) => (
        <span>{format(new Date(text), "d-MMM-yyyy' 'HH:mm:ss")}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: Commodite, record: any) => (
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
            onConfirm={() => del_commodite(record)}
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
        title={actionTitle + " un commodite"}
        width={520}
        onClose={onClose}
        destroyOnClose={true}
        visible={isDvisible}
      >
        <CommoditeForm
          data={selectedData}
          onSuccess={onFinish}
          onFailed={onFinishFailed}
          message={actionTitle}
        />
      </Drawer>
    </>
  );
}

const CommoditeForm = (props: FProps) => {
  let { data, message, onSuccess, onFailed } = props;

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Form
      {...formItemLayout}
      name="commoditeForm"
      initialValues={data}
      onFinish={onSuccess}
      onFinishFailed={onFailed}
    >
      <Form.Item
        label="Libellé"
        name="commoditelibelle"
        rules={[{ required: true, message: "Veuillez entrez un libellé !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="commoditedescription"
        rules={[{ required: false }]}
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

export default CommoditeScreen;
