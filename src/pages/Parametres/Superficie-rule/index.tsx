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
  Slider,
} from "antd";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import Superficie from "../../../utils/models/superficie.model";
import { format } from "date-fns";
import useSuperficeRule from "../../../hooks/useSuperficeRule";
import useSuperficie from "../../../hooks/useSuperfice";
import { SuperficieRule } from "../../../utils/models/superficierule.model";

interface Props {}

interface FProps {
  message: string;
  data: SuperficieRule | undefined;

  onSuccess: (superficie: Superficie) => Promise<void>;
  onFailed: (errorInfos: any) => void;
}

const { Option } = Select;

// =============================================================

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const btnItemLayout = {
  wrapperCol: { span: 4 },
};

// =============================================================

/**
 * Fonction d'affichage de l'interface Superficie
 * @param props
 * @returns Interface Superficie
 */
function SuperficieruleScreen(props: Props) {
  const {
    // liste_superficie,
    del_superficie,
    onFinish,
    onFinishFailed,

    showDrawer,
    onClose,
    showDrawer2,
    onClose2,
    actionTitle,
    selectedData,
    isDvisible,
    isDvisible2,
  } = useSuperficeRule();

  // const { data, error } = liste_superficie;

  const columns = [
    {
      title: "Min",
      dataIndex: "superficiemin",
      key: "superficiemin",
    },
    {
      title: "Max",
      dataIndex: "superficiemax",
      key: "superficiemax",
    },
    {
      title: "Date de création",
      dataIndex: "superficiedatecreation",
      key: "superficiedatecreation",
      render: (text: string) => (
        <span>{format(new Date(text), "d-MMM-yyyy' 'HH:mm:ss")}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: Superficie, record: any) => (
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
            onConfirm={() => del_superficie(record)}
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
      <div className="flex w-full justify-between">
        <div className="">
        <Button onClick={() => showDrawer2()}>Nouvelle regles</Button>
        </div>
        <div className="">
        <Button onClick={() => showDrawer()}>Gerer les superficies</Button>
        </div>
      </div>
      <Divider />

      {/*  TABLE */}
      {/* <Table size="small" dataSource={data?.data} columns={columns} /> */}

      {/* DRAWER : GESTION DES SUPERFICIES */}
      <Drawer
        title={"Gestion des superficies"}
        width={520}
        onClose={onClose}
        destroyOnClose={true}
        visible={isDvisible}
      >
        <SuperficieCRUD
          data={selectedData}
          onSuccess={onFinish}
          onFailed={onFinishFailed}
          message={actionTitle}
        />
      </Drawer>

       {/* DRAWER : CREATION DES REGLES DE GESTION DE PRIX */}
       <Drawer
        title={"Ajout des regles"}
        width={420}
        onClose={onClose2}
        destroyOnClose={true}
        visible={isDvisible2}
      >
        <SuperficieRuleForm
          data={selectedData}
          onSuccess={onFinish}
          onFailed={onFinishFailed}
          message={actionTitle}
        />
      </Drawer>
    </>
  );
}

const SuperficieCRUD = (props: FProps) => {
  const {
    liste_superficie: { data, error },
    del_superficie,
    onFinish,
    onFinishFailed,

    showDrawer,
    onClose,
    actionTitle,
    selectedData,
    isDvisible,
  } = useSuperficie();
  const [range, setRange] = useState("");
  const [rangeval, setRangeval] = useState([100, 200]);
  const changeSlider = (val: any) => {
    let text = `${val[0]} m² - ${val[1]} m² `;
    console.log(val);
    setRangeval(val)
    setRange(text);

  };

  const columns = [
    {
      title: "Min",
      dataIndex: "superficiemin",
      key: "superficiemin",
    },
    {
      title: "Max",
      dataIndex: "superficiemax",
      key: "superficiemax",
    },
    {
      title: "Date de création",
      dataIndex: "superficiedatecreation",
      key: "superficiedatecreation",
      render: (text: string) => (
        <span>{format(new Date(text), "d-MMM-yyyy' 'HH:mm:ss")}</span>
      ),
    },
  ];

  const onRowClick = (rowClicked:any) => {
    console.log(rowClicked);
    
  }

  return (
    <div>
      <Form
        {...formItemLayout}
        name="superficieForm"
        initialValues={{}}
        onFinish={()=> {
          onFinish(rangeval)
        }}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Superficie ( m. carré )"
          name="range"
          rules={[
            { required: false, message: "Veuillez indiquer un interval!" },
          ]}
        >
          <Slider range max={3000} step={50} onChange={changeSlider} defaultValue={[100, 200]}/>
          <p className=""> {range}</p>
        </Form.Item>

        <Form.Item {...btnItemLayout}>
          <Button type="primary" htmlType="submit">
            Ajouter
          </Button>
        </Form.Item>
      </Form>

      {/* TABLE DE SUPERFICIES */}

      <Table
        size="small"
        dataSource={data?.data}
        loading={!data?.data && !error}
        columns={columns}
        rowClassName="focus:bg-gray-500"
        bordered
        onRow={(record, rowIndex) => {
          return {
            onClick: () => onRowClick(record), // click row
          };
        }}
      />
    </div>
  );
};


const SuperficieRuleForm = (props: FProps) => {
  const [range, setRange] = useState("");
  const [rangeval, setRangeval] = useState([100, 200]);
  const changeSlider = (val: any) => {
    let text = `${val[0]} m² - ${val[1]} m² `;
    console.log(val);
    setRangeval(val)
    setRange(text);

  };


  return (
    <div>
      <Form
        {...formItemLayout}
        name="superficieForm"
        initialValues={{}}
        onFinish={()=> {
        }}
        onFinishFailed={() => {}}
      >
        <Form.Item
          label="Superficie ( m. carré )"
          name="range"
          rules={[
            { required: false, message: "Veuillez indiquer un interval!" },
          ]}
        >
          <Slider range max={3000} step={50} onChange={changeSlider} defaultValue={[100, 200]}/>
          <p className=""> {range}</p>
        </Form.Item>

        <Form.Item {...btnItemLayout}>
          <Button type="primary" htmlType="submit">
            Ajouter
          </Button>
        </Form.Item>
      </Form>

      
    </div>
  );
};

export default SuperficieruleScreen;
