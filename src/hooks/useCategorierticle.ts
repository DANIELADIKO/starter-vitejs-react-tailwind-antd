import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { message } from "antd";
import { AxiosResponse } from "axios";
import { Categoriearticle } from "../utils/models/categoriearticle.model";
import CategoriearticleService from "../utils/services/categoriearticle.service";

const categoriearticleService = new CategoriearticleService();

const useCategorierticle = () => {
  //STATE
  const [selectedData, setselectedData] =
    useState<Categoriearticle | undefined>();
  const [isDvisible, setDVisible] = useState(false);
  const [typeForm, settypeForm] = useState(0); // 0 pour add | 1 pour modifier
  const [actionTitle, setActionTitle] = useState("Ajouter");

  const showDrawer = (data?: Categoriearticle) => {
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
    setselectedData(undefined);
  };

  // CACHED DATA
  const liste_categoriearticle = useSWR(
    categoriearticleService.api.GET,
    categoriearticleService.get,
    {}
  );

  //=================================== CRUD
  const add_categoriearticle = async function (
    categoriearticle: Categoriearticle
  ) {
    const res = await categoriearticleService
      .post(categoriearticle)
      .catch(handleError);
    handleSucces(res, (d: any) => {
      message.success(
        "Operation reussie ! la categorie d'article a été enregistré."
      );
      mutate(categoriearticleService.api.GET);
    });
  };

  const upd_categoriearticle = async function (
    categoriearticle: Categoriearticle
  ) {
    const res = await categoriearticleService
      .update(categoriearticle)
      .catch(handleError);
    handleSucces(res, (d: any) => {
      message.success(
        "Operation reussie ! la categorie d'article a été modifié."
      );
      mutate(categoriearticleService.api.GET);
    });
  };

  const del_categoriearticle = async function (
    categoriearticle: Categoriearticle
  ) {
    const res = await categoriearticleService
      .delete(categoriearticle)
      .catch(handleError);
    handleSucces(res, (d: any) => {
      message.success(
        "Operation reussie ! la categorie d'article a été supprimé."
      );
      mutate(categoriearticleService.api.GET);
    });
  };
  // ===========================================

  // ===========================================  FROM FUNCTIONS

  const formHandler = (type: "success" | "error") => {
    const successFunction = async (values: any) => {
      console.log("Success:", values);
      let categoriearticle: Categoriearticle = selectedData as Categoriearticle;
      categoriearticle = { ...categoriearticle, ...values };

      if (typeForm === 0) {
        // Add
        await add_categoriearticle(categoriearticle)
      } else {
        await upd_categoriearticle(categoriearticle)
      }
    };

    const errorFunction = (errorInfos:any) => {
      console.log("Error Infos:", errorInfos);
    }

    if(type == 'error') return errorFunction
    else return successFunction
  };

  return {
    liste_categoriearticle,
    del_categoriearticle,
    formHandler,

    selectedData,
    isDvisible,
    actionTitle,

    onClose,
    showDrawer,
  };
};

export default useCategorierticle;

const handleError = function (error: any) {
  if (error.response) {
    message.warning(
      "Element existant ! cette categorie d'article existe déja sur la plateforme."
    );
  } else if (error.request) {
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
