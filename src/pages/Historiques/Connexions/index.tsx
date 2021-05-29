import React, { useState } from "react";
import {
  Button,
  Divider,
  Drawer,
  Form,
  Input,
  Space,
  Table,
  Tooltip,
} from "antd";
import ConnexionService from "../../../utils/services/connexions.service";
import useSWR from "swr";
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';

import {Connexion} from "../../../utils/models/connexions.model";
import { format } from 'date-fns'


interface Props {}

interface FProps {
  message: string;
}

const connexionsService = new ConnexionService();

const columns = [
  {
    title: "Utilisateur",
    dataIndex: "utilisateur",
    key: "utilisateur",
  },
  {
    title: "Type de connexion",
    dataIndex: "connexiontype",
    key: "connexiontype",
  },
  {
    title: "Date de création",
    dataIndex: "connexiondatecreation",
    key: "connexiondatecreation",
    render: (text:string) => <a>{format(new Date(text), "d-MMM-yyyy' 'HH:mm:ss") }</a>,
  },
  
];

/**
 * Fonction d'affichage de l'interface Connexion
 * @param props
 * @returns Interface Connexion
 */
function ConnexionScreen(props: Props) {
  const { data, error } = useSWR(
    connexionsService.api.GET,
    connexionsService.get()
  );
  console.log(data);

  const [isDvisible, setDVisible] = useState(false);
  const [message, setMessage] = useState("Ajouter");
  const showDrawer = (data?: Connexion) => {
    setDVisible(true);
    setMessage("Ajouter");
  };
  const onClose = () => {
    setDVisible(false);
  };

  return (
    <>
      {/* BUTTON GROUPS */}
      <div className="">
        {/* <Button onClick={() => showDrawer()}>Ajouter</Button> */}
        {/* <Button onClick={() => showDrawer()}>Modifier</Button> */}
      </div>
      <Divider />

      {/*  TABLE */}
      <Table size="small" dataSource={data?.data} columns={columns} />

      
    </>
  );
}


export default ConnexionScreen;
