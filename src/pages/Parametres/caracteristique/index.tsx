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

import Caracteristique from "../../../utils/models/caracteristique.model";
import { format } from "date-fns";

import useCaracteristique from "../../../hooks/useCaracteristique";
import { AxiosResponse } from "axios";

interface Props {}

interface FProps {
  message: string;
  data: Caracteristique | undefined;

  onSuccess: (caracteristique: Caracteristique) => Promise<void>;
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
 * Fonction d'affichage de l'interface Caracteristique
 * @param props
 * @returns Interface Caracteristique
 */
function CaracteristiqueScreen(props: Props) {
  const {
    liste_caracteristique,
    del_caracteristique,
    onFinish,
    onFinishFailed,

    showDrawer,
    onClose,
    actionTitle,
    selectedData,
    isDvisible,
  } = useCaracteristique();

  const { data, error } = liste_caracteristique;

  const columns = [
    {
      title: "Libellé",
      dataIndex: "caracteristiquelibelle",
      key: "caracteristiquelibelle",
    },
    {
      title: "Description",
      dataIndex: "caracteristiquedescription",
      key: "caracteristiquedescription",
    },
    {
      title: "Date de création",
      dataIndex: "caracteristiquedatecreation",
      key: "caracteristiquedatecreation",
      render: (text: string) => (
        <span>{format(new Date(text), "d-MMM-yyyy' 'HH:mm:ss")}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: Caracteristique, record: any) => (
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
            onConfirm={() => del_caracteristique(record)}
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
        title={actionTitle + " un caracteristique"}
        width={520}
        onClose={onClose}
        destroyOnClose={true}
        visible={isDvisible}
      >
        <CaracteristiqueForm
          data={selectedData}
          onSuccess={onFinish}
          onFailed={onFinishFailed}
          message={actionTitle}
        />
      </Drawer>
    </>
  );
}

const CaracteristiqueForm = (props: FProps) => {
  let { data, message, onSuccess, onFailed } = props;

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Form
      {...formItemLayout}
      name="caracteristiqueForm"
      initialValues={data}
      onFinish={onSuccess}
      onFinishFailed={onFailed}
    >
      <Form.Item
        label="Libellé"
        name="caracteristiquelibelle"
        rules={[{ required: true, message: "Veuillez entrez un libellé !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="caracteristiquedescription"
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

export default CaracteristiqueScreen;
