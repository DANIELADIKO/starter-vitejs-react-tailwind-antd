import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import {  message, } from "antd";
import { AxiosResponse } from "axios";
import CommoditeService from "../utils/services/commodite.service";
import Commodite from "../utils/models/commodite.model";



const commoditeService = new CommoditeService();

const useCommodite = () => {

    //STATE
    const [selectedData, setselectedData] = useState<Commodite>();
    const [isDvisible, setDVisible] = useState(false);
    const [typeForm, settypeForm] = useState(0); // 0 pour add | 1 pour modifier
    const [actionTitle, setActionTitle] = useState("Ajouter");


    const showDrawer = (data?: Commodite) => {
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
    const liste_commodite =  useSWR(commoditeService.api.GET, commoditeService.get(), {});

    //=================================== CRUD
    const add_commodite = async function(commodite:Commodite){
        const res = await commoditeService.post(commodite).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le type de requete a été enregistré.")
            mutate(commoditeService.api.GET)
        })
    }

    const upd_commodite = async function(commodite:Commodite){
        const res = await commoditeService.update(commodite).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le type de requete a été modifié.")
            mutate(commoditeService.api.GET)
        })
    }

    const del_commodite = async function(commodite:Commodite){
        const res = await commoditeService.delete(commodite).catch(handleError);
        handleSucces(res, (d:any) =>{
            message.success("Operation reussie ! le type de requete a été supprimé.")
            mutate(commoditeService.api.GET)
        })
    }
    // ===========================================


  // =========================================== FORM FUNCTIONS

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    let commodite: Commodite = selectedData as Commodite;
    commodite = { ...commodite, ...values };
   
    console.log(commodite);
    if (typeForm === 0) {
      // Add
      await add_commodite(commodite);
    } else {
      await upd_commodite(commodite);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  

    return {
        liste_commodite,
        onFinish,
        onFinishFailed,
        del_commodite,

        selectedData, 
        isDvisible, 
        actionTitle,

        onClose,
        showDrawer,
        
    }
}

export default useCommodite;


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