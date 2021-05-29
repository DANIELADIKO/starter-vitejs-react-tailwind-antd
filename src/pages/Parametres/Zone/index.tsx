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

import Zone from "../../../utils/models/zone.model";
import { format } from "date-fns";

import { AxiosResponse } from "axios";
import Typezone from "../../../utils/models/typezone.model";
import useZone from "../../../hooks/useZone";
import useTypezone from "../../../hooks/useTypezone";

interface Props {}

interface FProps {
  message: string;
  data: Zone | undefined;

  onSuccess: (zone: Zone) => Promise<void>;
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



const dataTest = [{
    "zonelibelle": "Abdjan",
    "zoneattribut": {
      "zoneattributid": 1,
      "zoneattributdatecreation": "2021-04-23 12:29:07.003",
      "zoneattributenable": true,
      "zoneattributlibelle": "ville"
    },
    "zonedescription": "Capitale Ivoirienne",
    "zonedatecreation" :  "2021-04-23 12:29:07.003",
  }]

/**
 * Fonction d'affichage de l'interface Zone
 * @param props
 * @returns Interface Zone
 */
function ZoneScreen(props: Props) {
  const {
    liste_zone,
    del_zone,
    onFinish,
    onFinishFailed,

    showDrawer,
    onClose,
    actionTitle,
    selectedData,
    isDvisible,
  } = useZone();

  const { data, error } = liste_zone;

  const columns = [
    {
      title: "Libellé",
      dataIndex: "zonelibelle",
      key: "zonelibelle",
    },
    {
      title: "Description",
      dataIndex: "zonedescription",
      key: "zonedescription",
    },
    {
      title: "Date de création",
      dataIndex: "zonedatecreation",
      key: "zonedatecreation",
      render: (text: string) => (
        <span>{format(new Date(text), "d-MMM-yyyy' 'HH:mm:ss")}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: Zone, record: any) => (
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
            onConfirm={() => del_zone(record)}
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
      {/* <Table size="small" dataSource={dataTest} columns={columns} /> */}

      {/* DRAWER */}
      <Drawer
        title={actionTitle + " une zone"}
        width={520}
        onClose={onClose}
        destroyOnClose={true}
        visible={isDvisible}
      >
        <ZoneForm
          data={selectedData}
          onSuccess={onFinish}
          onFailed={onFinishFailed}
          message={actionTitle}
        />
      </Drawer>
    </>
  );
}

const ZoneForm = (props: FProps) => {
  let { data, message, onSuccess, onFailed } = props;

  const { liste_typezone } = useTypezone();
  const liste = liste_typezone.data;

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Form
      {...formItemLayout}
      name="zoneForm"
      initialValues={(()=>{
          let value:any = data
          if (value && typeof(data?.zoneattribut) != "string") {
            value.zoneattribut = JSON.stringify(data?.zoneattribut)
          }
          console.log(data?.zoneattribut);
          console.log(typeof(data?.zoneattribut) );
          
          return value
      })()}
      onFinish={onSuccess}
      onFinishFailed={onFailed}
    >
      <Form.Item
        label="Libellé"
        name="zonelibelle"
        rules={[{ required: true, message: "Veuillez entrez un libellé !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Type"
        name="zoneattribut"
        rules={[{ required: true, message: "Veuillez selectionner un type!" }]}
      >
        <Select bordered={true}>
            { liste?.data.map((type: Typezone )=> <Option value={JSON.stringify(type)} >{type.zoneattributlibelle}</Option> ) }
        </Select>
      </Form.Item>

      <Form.Item
        label="Description"
        name="zonedescription"
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

export default ZoneScreen;
