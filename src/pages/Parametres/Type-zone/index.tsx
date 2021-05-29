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

import Typezone from "../../../utils/models/typezone.model";
import { format } from "date-fns";

import { AxiosResponse } from "axios";
import useTypezone from "../../../hooks/useTypezone";

interface Props {}

interface FProps {
  message: string;
  data: Typezone | undefined;
  
  onSuccess:(typezone: Typezone) => Promise<void>
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
 * Fonction d'affichage de l'interface Typezone
 * @param props
 * @returns Interface Typezone
 */
function TypezoneScreen(props: Props) {
  const {
    liste_typezone,
    del_typezone,
    onFinish,
    onFinishFailed,

    showDrawer,
    onClose,
    actionTitle,
    selectedData,
    isDvisible,
    
  } = useTypezone();

  const { data, error } = liste_typezone;

  const columns = [
    {
      title: "Libellé",
      dataIndex: "zoneattributlibelle",
      key: "zoneattributlibelle",
    },
    {
      title: "Date de création",
      dataIndex: "zoneattributdatecreation",
      key: "zoneattributdatecreation",
      render: (text: string) => (
        <span>{format(new Date(text), "d-MMM-yyyy' 'HH:mm:ss")}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: Typezone, record: any) => (
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
            onConfirm={() => del_typezone(record)}
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
        title={actionTitle + " un typezone"}
        width={520}
        onClose={onClose}
        destroyOnClose={true}
        visible={isDvisible}
      >
        <TypezoneForm data={selectedData} onSuccess={onFinish} onFailed={onFinishFailed} message={actionTitle} />
      </Drawer>
    </>
  );
}

const TypezoneForm = (props: FProps) => {
  let { data, message, onSuccess, onFailed, } = props;


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Form
    {...formItemLayout}
      name="typezoneForm"
      initialValues={data}
      onFinish={onSuccess}
      onFinishFailed={onFailed}
    >
      <Form.Item
        label="Libellé"
        name="zoneattributlibelle"
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

export default TypezoneScreen;
