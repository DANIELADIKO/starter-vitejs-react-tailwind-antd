import React, { useState, useEffect } from "react";
import BanniereService from "../utils/services/banniere.service";
import useSWR, { mutate } from "swr";
import Banniere from "../utils/models/banniere.model";
import { message } from "antd";
import { AxiosResponse } from "axios";
import { RcFile } from "antd/lib/upload";


import {getBase64} from '../utils/helpers/img.helper'


const banniereService = new BanniereService();

const useBanniere = () => {
  //STATE
  const [selectedData, setselectedData] = useState<Banniere | undefined>();
  const [isDvisible, setDVisible] = useState(false);
  const [typeForm, settypeForm] = useState(0); // 0 pour add | 1 pour modifier
  const [actionTitle, setActionTitle] = useState("Ajouter");

  const [imgUrl, setImgUrl] = useState("");
  const [file, setFile] = useState<RcFile | undefined>(undefined); // Variable pour stocker les fichier
  

  const showDrawer = (data?: Banniere) => {
    setDVisible(true);
    setActionTitle("Ajouter");
    if (data) {
      settypeForm(1);
      setActionTitle("Modifier");
      setselectedData(data);
    }
  };
  const onClose = () => {
    setDVisible(false);
    settypeForm(0);
    setImgUrl("")
    setselectedData(undefined);
  };

  // CACHED DATA
  const liste_banniere = useSWR(
    banniereService.api.GET,
    banniereService.get(),
    {}
  );

  //=================================== CRUD
  const add_banniere = async function (banniere: Banniere, file?: RcFile) {
    const res = await banniereService.post(banniere, file).catch(handleError);
    handleSucces(res, (d: any) => {
      message.success("Operation reussie ! la banniere a été enregistré.");
      mutate(banniereService.api.GET);
    });
  };

  const upd_banniere = async function (banniere: Banniere, file?: RcFile) {
    const res = await banniereService.update(banniere, file).catch(handleError);
    handleSucces(res, (d: any) => {
      message.success("Operation reussie ! la banniere a été modifié.");
      mutate(banniereService.api.GET);
    });
  };

  const del_banniere = async function (banniere: Banniere) {
    const res = await banniereService.delete(banniere).catch(handleError);
    handleSucces(res, (d: any) => {
      message.success("Operation reussie ! la banniere a été supprimé.");
      mutate(banniereService.api.GET);
    });
  };
  // ===========================================

  // =========================================== FORM FUNCTIONS

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    let banniere: Banniere = selectedData as Banniere;
    banniere = { ...banniere, ...values };
    if (file) {
      banniere.banniereimage = "";
    }
    console.log(banniere);
    if (typeForm === 0) {
      // Add
      await add_banniere(banniere, file);
    } else {
      await upd_banniere(banniere, file);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const beforeUpload = (fle: RcFile, FileList: RcFile[]) => {
    // Verifier le type de fichier
    const isJpgOrPng = fle.type === "image/jpeg" || fle.type === "image/png";
    if (!isJpgOrPng) {
      message.warning("Seulement les fichiers de type JPG/PNG sont autorisés!");
      return false;
    }
    // Verifier la taille des images ( inferierure a 2MB)
    const isLt2M = fle.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("La taille de l'image ne doit exceder 2MB!");
      return false;
    }
    // Stocker le fichier dans la variable
    setFile(fle);

    getBase64(fle,(imgUrl:string)=> {
      setImgUrl(imgUrl)
    })
    //  Specifier de ne pas uploader directement le fichier
    return false;
  };

  

  // ===========================================

  return {
    liste_banniere,
    onFinish,
    onFinishFailed,
    del_banniere,

    selectedData,
    isDvisible,
    actionTitle,
    beforeUpload,
    onClose,
    showDrawer,
    typeForm,

    imgUrl
  };
};

export default useBanniere;

const handleError = function (error: any) {
  if (error.response && error.response.status == 409) {
    message.warning(
      "Element existant ! cette banniere existe déja sur la plateforme."
    );
  } else if (error.request && error.response.status == 400) {
    // The request was made but no response was received
    message.error(
      "Erreur API ! Veuillez Contacter l'administrateur du serveur."
    );
  } else {
    // Something happened in setting up the request that triggered an Error
    message.error(
      "Erreur interne ! Veuillez Contacter l'administrateur de la plateforme."
    );
  }
};

const handleSucces = function (data: AxiosResponse | void, cb?: any) {
  if (data && data.status == 200) {
    if (cb) {
      cb(data);
    } else {
      return data;
    }
  } else if (data && data.status == 204) {
    // The request was made but no response was received
    message.warning(
      "Aucune Donnée ! La ressource demandée n'existe pas sur le serveur."
    );
  } else if (data && data.status == 201) {
    // Something happened in setting up the request that triggered an Error
    message.success(
      "Operation reussie ! les données sont atomatiquement mise a jour."
    );
  }
};
