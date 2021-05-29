import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  Popconfirm,
  Radio,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import Typepay from "../../../utils/models/typepay.model";
import { format } from "date-fns";
import Utilisateur from "../../../utils/models/utilisateur.model";
import moment from "moment";
import Role from "../../../utils/models/role.model";
import useUtilisateur from "../../../hooks/useUtilisateur";
import useRole from "../../../hooks/useRole";

interface Props {}

interface FProps {
  message: string;
  data: Utilisateur | undefined;
  onSuccess: (utilisateur: Utilisateur) => Promise<void>;
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
 * Fonction d'affichage de l'interface Typepay
 * @param props
 * @returns Interface Typepay
 */
function UtilisateurScreen(props: Props) {
  const {
    liste_utilisateur,
    del_utilisateur,
    onFinish,
    onFinishFailed,

    showDrawer,
    onClose,
    actionTitle,
    selectedData,
    isDvisible,
  } = useUtilisateur("client");
  const {liste_role_client} = useRole()

  const { data, error } = liste_utilisateur;
  const { data:dataRole, error:errorRole } = liste_role_client;

  const columns = [
    {
      title: "Nom",
      dataIndex: "utilisateurnom",
      key: "utilisateurnom",
    },
    {
      title: "Prenom",
      dataIndex: "utilisateurprenom",
      key: "utilisateurprenom",
    },
    {
      title: "Email",
      dataIndex: "utilisateuremail",
      key: "utilisateuremail",
    },
    {
      title: "Statut",
      dataIndex: "utilisateurstatus",
      key: "utilisateurstatus",
    },
    {
      title: "Contact",
      dataIndex: "utilisateurcontact1",
      key: "utilisateurcontact1",
    },

    {
      title: "Date de création",
      dataIndex: "utilisateurdatecreation",
      key: "utilisateurdatecreation",
      render: (text: string) => (
        <a>{format(new Date(text), "d-MMM-yyyy' 'HH:mm:ss")}</a>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: Typepay, record: any) => (
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
            onConfirm={() => del_utilisateur(record)}
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
      ),
    },
  ];

  return (
    <>
      {/* BUTTON GROUPS */}
      <div className="flex flex-row justify-between">
        <div className="w-36">
        <Select placeholder="Role Utilisateur" className="w-full" bordered={true}>
            { dataRole?.data.map((type: Role )=> <Option value={JSON.stringify(type)} >{type.rolename}</Option> ) }
          
        </Select>
        </div>
        <Button onClick={() => showDrawer()}>Ajouter</Button>
        {/* <Button onClick={() => showDrawer()}>Modifier</Button> */}
      </div>
      <Divider />

      {/*  TABLE */}
      <Table size="small" dataSource={data?.data} columns={columns} />

      {/* DRAWER */}
      <Drawer
        title={actionTitle + " un utilisateur"}
        width={620}
        className=""
        onClose={onClose}
        destroyOnClose={true}
        visible={isDvisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <UtilisateurForm
          data={selectedData}
          onSuccess={onFinish}
          onFailed={onFinishFailed}
          message={actionTitle}
        />
      </Drawer>
    </>
  );
}

const UtilisateurForm = (props: FProps) => {
  // PROPS
  let { data, message, onSuccess, onFailed } = props;
  
  // STATE
  const [datenaissance, setDatenaissance] = useState<any>(null)

  // HANDLERS
  const onChange = (elt: any, val: any) => {
    console.log("=========== CHANGE DATE PICKER =============");
    console.log(elt, val);
    if (!elt) setDatenaissance("");
    else setDatenaissance(format(new Date(val), "yyyy-MM-dd HH:mm:ss.SSS"));
  };


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

   
    <Form
      {...formItemLayout}
      name="utilisateurForm"
      initialValues={(()=> {
        let val:any = data 
        if (
          data &&
          val.utilisateurdatenaissance &&
          val.utilisateurdatenaissance.length > 1
        )
          val.utilisateurdatenaissance = moment(
            data?.utilisateurdatenaissance as string
          );
        return val;
      })()}
      onFinish={(formvalues) =>{
          formvalues.utilisateurdatenaissance = datenaissance
        return onSuccess(formvalues)
      }}
      onFinishFailed={onFailed}
    >
      <div className="relative mb-3">
        <Form.Item
          label="Nom"
          name="utilisateurnom"
          rules={[{ required: true, message: "Veuillez entrez un nom !" }]}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="relative mb-3">
        <Form.Item
          label="Prenoms"
          name="utilisateurprenom"
          rules={[{ required: true, message: "Veuillez entrez un prenom !" }]}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="relative mb-3">
        <Form.Item
          label="Email"
          name="utilisateuremail"
          rules={[
            {
              required: true,
              message: "Veuillez entrez une adresse mail !",
            },
            { type: "email", message: "l'adresse n'est pas valide !" },
          ]}
        >
          <Input />
        </Form.Item>
      </div>

      {data && Object.entries(data).length > 0 ? (
        ""
      ) : (
        <>
          <div className="relative mb-3">
            <Form.Item
              label="Mot de passe"
              name="utilisateurpassword"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrez un mot de passe !",
                },
                {
                  message: "Veuillez entrez plus de 5 caracteres !",
                  min: 5,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>

          <div className="relative mb-3">
            <Form.Item
              label="Confirmer le Mot de passe"
              name="cutilisateurpassword"
              dependencies={["utilisateurpassword"]}
              rules={[
                {
                  required: true,
                  message: "Veuillez entrez un mot de passe !",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue("utilisateurpassword") === value
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Les deux mots de passe ne correponsent pas!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>
        </>
      )}

      <div className="relative mb-3">
        <Form.Item
          label="Contact"
          name="utilisateurcontact1"
          rules={[
            { required: true, message: "Veuillez entrez un contact !" },
            //   {
            //     pattern: /ˆ[0-9]*/,
            //     message: "Veuillez entrez un contact valide !",
            //   },
          ]}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="relative mb-3">
        <Form.Item
          label="Date de naissance"
          name="utilisateurdatenaissance"
          rules={[{ required: true, message: "Veuillez entrez un contact !" }]}
        >
          <DatePicker onChange={onChange} />
        </Form.Item>
      </div>

      <Form.Item name="genre" label="Sexe">
        <Radio.Group>
          <Radio value="H">Homme</Radio>
          <Radio value="F">Femme</Radio>
          <Radio value="A">Autre</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="utilisateurisowner" label="Est Proprietaire">
        <Radio.Group>
          <Radio value="True">Oui</Radio>
          <Radio value="False">Non</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Presentation"
        name="utilisateurpresentation"
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

export default UtilisateurScreen;
