import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import {  message, } from "antd";
import { AxiosResponse } from "axios";
import Typezone from "../utils/models/typezone.model";
import TypezoneService from "../utils/services/typezone.service";



const typezoneService = new TypezoneService();

const useTypezone = () => {

    //STATE
    const [selectedData, setselectedData] = useState<Typezone>();
    const [isDvisible, setDVisible] = useState(false);
    const [typeForm, settypeForm] = useState(0); // 0 pour add | 1 pour modifier
    const [actionTitle, setActionTitle] = useState("Ajouter");


    const showDrawer = (data?: Typezone) => {
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
    const liste_typezone =  useSWR(typezoneService.api.GET, typezoneService.get(), {});
    
    //=================================== CRUD
    const add_typezone = async function(typezone:Typezone){
        const res = await typezoneService.post(typezone).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le type de zone a été enregistré.")
            mutate(typezoneService.api.GET)
        })
    }

    const upd_typezone = async function(typezone:Typezone){
        const res = await typezoneService.update(typezone).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le type de zone a été modifié.")
            mutate(typezoneService.api.GET)
        })
    }

    const del_typezone = async function(typezone:Typezone){
        const res = await typezoneService.delete(typezone).catch(handleError);
        handleSucces(res, (d:any) =>{
            message.success("Operation reussie ! le type de zone a été supprimé.")
            mutate(typezoneService.api.GET)
        })
    }
    // ===========================================


  // =========================================== FORM FUNCTIONS

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    let typezone: Typezone = selectedData as Typezone;
    typezone = { ...typezone, ...values };
   
    console.log(typezone);
    if (typeForm === 0) {
      // Add
      await add_typezone(typezone);
    } else {
      await upd_typezone(typezone);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  

    return {
        liste_typezone,
        onFinish,
        onFinishFailed,
        del_typezone,

        selectedData, 
        isDvisible, 
        actionTitle,

        onClose,
        showDrawer,
        
    }
}

export default useTypezone;


const handleError = function (error:any) {
    if (error.response) {
        message.warning("Element existant ! ce type de zone existe déja sur la plateforme.")
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