import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import {  message, } from "antd";
import { AxiosResponse } from "axios";
import Typezone from "../utils/models/typezone.model";
import Zone from "../utils/models/zone.model";
import ZoneService from "../utils/services/zone.service";



const zoneService = new ZoneService();

const useZone = () => {

    //STATE
    const [selectedData, setselectedData] = useState<Zone>();
    const [isDvisible, setDVisible] = useState(false);
    const [typeForm, settypeForm] = useState(0); // 0 pour add | 1 pour modifier
    const [actionTitle, setActionTitle] = useState("Ajouter");


    const showDrawer = (data?: Zone) => {
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
    const liste_zone =  useSWR(zoneService.api.GET, zoneService.get({
      page:0,
      size:10
    }), {});

    //=================================== CRUD
    const add_zone = async function(zone:Zone){
        const res = await zoneService.post(zone).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le type de requete a été enregistré.")
            mutate(zoneService.api.GET)
        })
    }

    const upd_zone = async function(zone:Zone){
        const res = await zoneService.update(zone).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le type de requete a été modifié.")
            mutate(zoneService.api.GET)
        })
    }

    const del_zone = async function(zone:Zone){
        const res = await zoneService.delete(zone).catch(handleError);
        handleSucces(res, (d:any) =>{
            message.success("Operation reussie ! le type de requete a été supprimé.")
            mutate(zoneService.api.GET)
        })
    }
    // ===========================================


  // =========================================== FORM FUNCTIONS

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    let zone: Zone = selectedData as Zone;
    zone = { ...zone, ...values };
    zone.zoneattribut = JSON.parse(values.zoneattribut) as Typezone
   
    console.log(zone);
    if (typeForm === 0) {
      // Add
      await add_zone(zone);
    } else {
      await upd_zone(zone);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  

    return {
        liste_zone,
        onFinish,
        onFinishFailed,
        del_zone,

        selectedData, 
        isDvisible, 
        actionTitle,

        onClose,
        showDrawer,
        
    }
}

export default useZone;


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