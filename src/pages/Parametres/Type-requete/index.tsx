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

import Typerequete from "../../../utils/models/typerequete.model";
import { format } from "date-fns";

import { AxiosResponse } from "axios";
import useTyperequete from "../../../hooks/useTyperequete";

interface Props {}

interface FProps {
  message: string;
  data: Typerequete | undefined;
  
  onSuccess:(typerequete: Typerequete) => Promise<void>
  onFailed:(errorInfos: any) => void
}



const { Option } = Select;



// =============================================================

const formItemLayout = {
  labelCol: { span: 4},
  wrapperCol: { span: 20 },
};

const btnItemLayout = {
  wrapperCol: { span: 4 },
};




// =============================================================


/**
 * Fonction d'affichage de l'interface Typerequete
 * @param props
 * @returns Interface Typerequete
 */
function TyperequeteScreen(props: Props) {
  const {
    liste_typerequete,
    del_typerequete,
    onFinish,
    onFinishFailed,

    showDrawer,
    onClose,
    actionTitle,
    selectedData,
    isDvisible,
    
  } = useTyperequete();

  const { data, error } = liste_typerequete;

  const columns = [
    {
      title: "Libellé",
      dataIndex: "typerequetelibelle",
      key: "typerequetelibelle",
    },
    {
        title: "Description",
        dataIndex: "typerequetedescription",
        key: "typerequetedescription",
      },
    {
      title: "Date de création",
      dataIndex: "typerequetedatecreation",
      key: "typerequetedatecreation",
      render: (text: string) => (
        <span>{format(new Date(text), "d-MMM-yyyy' 'HH:mm:ss")}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: Typerequete, record: any) => (
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
            onConfirm={() => del_typerequete(record)}
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
        title={actionTitle + " un typerequete"}
        width={520}
        onClose={onClose}
        destroyOnClose={true}
        visible={isDvisible}
      >
        <TyperequeteForm data={selectedData} onSuccess={onFinish} onFailed={onFinishFailed} message={actionTitle} />
      </Drawer>
    </>
  );
}

const TyperequeteForm = (props: FProps) => {
  let { data, message, onSuccess, onFailed, } = props;


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Form
    {...formItemLayout}
      name="typerequeteForm"
      initialValues={data}
      onFinish={onSuccess}
      onFinishFailed={onFailed}
    >
      <Form.Item
        label="Libellé"
        name="typerequetelibelle"
        rules={[{ required: true, message: "Veuillez entrez un libellé !" }]}
      >
        <Input />
      </Form.Item>



      <Form.Item {...btnItemLayout}>
        <Button type="primary" htmlType="submit">
          {message}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TyperequeteScreen;
