import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import {  message, } from "antd";
import { AxiosResponse } from "axios";
import SuperficieService from "../utils/services/superficie.service";
import Superficie from "../utils/models/superficie.model";



const superficieService = new SuperficieService();

const useSuperficie = () => {

    //STATE
    const [selectedData, setselectedData] = useState<Superficie>();
    const [isDvisible, setDVisible] = useState(false);
    const [typeForm, settypeForm] = useState(0); // 0 pour add | 1 pour modifier
    const [actionTitle, setActionTitle] = useState("Ajouter");


    const showDrawer = (data?: Superficie) => {
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
    const liste_superficie =  useSWR(superficieService.api.GET, superficieService.get);
  
    //=================================== CRUD
    const add_superficie = async function(superficie:Superficie){
        const res = await superficieService.post(superficie).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le superficie a été enregistré.")
            mutate(superficieService.api.GET)
        })
    }

    const upd_superficie = async function(superficie:Superficie){
        const res = await superficieService.update(superficie).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le superficie a été modifié.")
            mutate(superficieService.api.GET)
        })
    }

    const del_superficie = async function(superficie:Superficie){
        const res = await superficieService.delete(superficie).catch(handleError);
        handleSucces(res, (d:any) =>{
            message.success("Operation reussie ! le superficie a été supprimé.")
            mutate(superficieService.api.GET)
        })
    }
    // ===========================================


  // =========================================== FORM FUNCTIONS

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    
    let superficie: Superficie = {
      superficiemax:values[1],
      superficiemin:values[0]
    };
    
    console.log(superficie);
    
    if (typeForm === 0) {
      // Add
      await add_superficie(superficie);
    } else {
      await upd_superficie(superficie);
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
        actionTitle,

        onClose,
        showDrawer,
        
    }
}

export default useSuperficie;


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