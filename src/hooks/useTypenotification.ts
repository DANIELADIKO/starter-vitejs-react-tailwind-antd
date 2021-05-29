import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import {  message, } from "antd";
import { AxiosResponse } from "axios";
import Typenotification from "../utils/models/typenotification.model";
import TypenotificationService from "../utils/services/typenotification.service";



const typenotificationService = new TypenotificationService();

const useTypenotification = () => {

    //STATE
    const [selectedData, setselectedData] = useState<Typenotification>();
    const [isDvisible, setDVisible] = useState(false);
    const [typeForm, settypeForm] = useState(0); // 0 pour add | 1 pour modifier
    const [actionTitle, setActionTitle] = useState("Ajouter");


    const showDrawer = (data?: Typenotification) => {
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
    const liste_typenotification =  useSWR(typenotificationService.api.GET, typenotificationService.get(), {});

    //=================================== CRUD
    const add_typenotification = async function(typenotification:Typenotification){
        const res = await typenotificationService.post(typenotification).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le type de notification a été enregistré.")
            mutate(typenotificationService.api.GET)
        })
    }

    const upd_typenotification = async function(typenotification:Typenotification){
        const res = await typenotificationService.update(typenotification).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le type de notification a été modifié.")
            mutate(typenotificationService.api.GET)
        })
    }

    const del_typenotification = async function(typenotification:Typenotification){
        const res = await typenotificationService.delete(typenotification).catch(handleError);
        handleSucces(res, (d:any) =>{
            message.success("Operation reussie ! le type de notification a été supprimé.")
            mutate(typenotificationService.api.GET)
        })
    }
    // ===========================================

    return {
        liste_typenotification,
        add_typenotification,
        upd_typenotification,
        del_typenotification,

        selectedData, 
        isDvisible, 
        actionTitle,

        onClose,
        showDrawer,
        typeForm
    }
}

export default useTypenotification;


const handleError = function (error:any) {
    if (error.response) {
        message.warning("Element existant ! ce typenotification existe déja sur la plateforme.")
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