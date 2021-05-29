import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import {  message, } from "antd";
import { AxiosResponse } from "axios";
import TyperequeteService from "../utils/services/typerequete.service";
import Typerequete from "../utils/models/typerequete.model";



const typerequeteService = new TyperequeteService();

const useTyperequete = () => {

    //STATE
    const [selectedData, setselectedData] = useState<Typerequete>();
    const [isDvisible, setDVisible] = useState(false);
    const [typeForm, settypeForm] = useState(0); // 0 pour add | 1 pour modifier
    const [actionTitle, setActionTitle] = useState("Ajouter");


    const showDrawer = (data?: Typerequete) => {
        setDVisible(true);
        setActionTitle("Ajouter");
        if (data) {
            settypeForm(1)
          setActionTitle("Modifier");
          setselectedData(data);
        }
      };
      const onClose = () => {
        setDVisible(false);
        settypeForm(0)
        setselectedData(undefined)
      };


    // CACHED DATA
    const liste_typerequete =  useSWR(typerequeteService.api.GET, typerequeteService.get(), {});

    //=================================== CRUD
    const add_typerequete = async function(typerequete:Typerequete){
        const res = await typerequeteService.post(typerequete).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le type de requete a été enregistré.")
            mutate(typerequeteService.api.GET)
        })
    }

    const upd_typerequete = async function(typerequete:Typerequete){
        const res = await typerequeteService.update(typerequete).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le type de requete a été modifié.")
            mutate(typerequeteService.api.GET)
        })
    }

    const del_typerequete = async function(typerequete:Typerequete){
        const res = await typerequeteService.delete(typerequete).catch(handleError);
        handleSucces(res, (d:any) =>{
            message.success("Operation reussie ! le type de requete a été supprimé.")
            mutate(typerequeteService.api.GET)
        })
    }
    // ===========================================


  // =========================================== FORM FUNCTIONS

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    let typerequete: Typerequete = selectedData as Typerequete;
    typerequete = { ...typerequete, ...values };
   
    console.log(typerequete);
    if (typeForm === 0) {
      // Add
      await add_typerequete(typerequete);
    } else {
      await upd_typerequete(typerequete);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  

    return {
        liste_typerequete,
        onFinish,
        onFinishFailed,
        del_typerequete,

        selectedData, 
        isDvisible, 
        actionTitle,

        onClose,
        showDrawer,
        
    }
}

export default useTyperequete;


const handleError = function (error:any) {
    if (error.response) {
        message.warning("Element existant ! ce type de requete existe déja sur la plateforme.")
    } else if (error.request) {
      // The request was made but no response was received
      message.error("Erreur API ! Veuillez Contacter l'administrateur du serveur.")
    } else {
      // Something happened in setting up the request that triggered an Error
      message.error("Erreur interne ! Veuillez Contacter l'administrateur de la plateforme.")
    }
  }


  const handleSucces = function (data:AxiosResponse | void, cb?:any) {
    if (data && data.status == 200) {
        if (cb) {
            cb(data)
        } else {
            return data
        }
        
    } else if (data && data.status == 204) {
      // The request was made but no response was received
      message.warning("Aucune Donnée ! La ressource demandée n'existe pas sur le serveur.")
    } else if(data && data.status == 201) {
      // Something happened in setting up the request that triggered an Error
      message.success("Operation reussie ! les données sont atomatiquement mise a jour.")
    }
  }