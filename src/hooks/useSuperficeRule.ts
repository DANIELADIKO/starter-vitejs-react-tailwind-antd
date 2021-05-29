import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import {  message, } from "antd";
import { AxiosResponse } from "axios";
import SuperficieService from "../utils/services/superficie.service";
import Superficie from "../utils/models/superficie.model";
import { SuperficieRule } from "../utils/models/superficierule.model";
import SuperficieRuleService from "../utils/services/superficierule.service";



const superficieruleservice = new SuperficieRuleService();

const useSuperficieRule = () => {

    //STATE
    const [selectedData, setselectedData] = useState<SuperficieRule>();
    const [isDvisible, setDVisible] = useState(false);
    const [isDvisible2, setDVisible2] = useState(false);
    const [typeForm, settypeForm] = useState(0); // 0 pour add | 1 pour modifier
    const [actionTitle, setActionTitle] = useState("Ajouter");


    const showDrawer = (data?: SuperficieRule) => {
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


    const showDrawer2 = (data?: SuperficieRule) => {
      setDVisible2(true);
      setActionTitle("Ajouter");
      if (data) {
          settypeForm(1)
        setActionTitle("Modifier");
        setselectedData(data);
      }
    };
    const onClose2 = () => {
      setDVisible2(false);
      settypeForm(0)
      setselectedData(undefined)
    };


    // CACHED DATA
    const liste_superficie =  useSWR([superficieruleservice.api.GET,], superficieruleservice.get);
  
    //=================================== CRUD
    const add_superficie = async function(superficie:SuperficieRule){
        const res = await superficieruleservice.post(superficie).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le superficie a été enregistré.")
            mutate(superficieruleservice.api.GET)
        })
    }

    const del_superficie = async function(superficie:SuperficieRule){
        const res = await superficieruleservice.delete(superficie).catch(handleError);
        handleSucces(res, (d:any) =>{
            message.success("Operation reussie ! le superficie a été supprimé.")
            mutate(superficieruleservice.api.GET)
        })
    }
    // ===========================================


  // =========================================== FORM FUNCTIONS

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    return
    let superficie: SuperficieRule = selectedData as SuperficieRule;
    superficie = { ...superficie, ...values };
   
    console.log(superficie);
    
    if (typeForm === 0) {
      // Add
      await add_superficie(superficie);
    } else {
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };



    return {
        liste_superficie,
        onFinish,
        onFinishFailed,
        del_superficie,

        selectedData, 
        isDvisible,
        isDvisible2, 
        actionTitle,

        onClose,
        showDrawer,
        onClose2,
        showDrawer2,
        
    }
}

export default useSuperficieRule;


const handleError = function (error:any) {
    if (error.response) {
        message.warning("Element existant ! ce superficie existe déja sur la plateforme.")
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