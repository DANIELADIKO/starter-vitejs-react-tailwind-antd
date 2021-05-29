import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import {  message, } from "antd";
import { AxiosResponse } from "axios";
import Typepay from "../utils/models/typepay.model";
import TypepayService from "../utils/services/typepay.service";



const typepayService = new TypepayService();

const useTypepay = () => {

    //STATE
    const [selectedData, setselectedData] = useState<Typepay|undefined>();
    const [isDvisible, setDVisible] = useState(false);
    const [typeForm, settypeForm] = useState(0); // 0 pour add | 1 pour modifier
    const [actionTitle, setActionTitle] = useState("Ajouter");


    const showDrawer = (data?: Typepay) => {
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
    const liste_typepay =  useSWR(typepayService.api.GET, typepayService.get(), {});

    //=================================== CRUD
    const add_typepay = async function(typepay:Typepay){
        const res = await typepayService.post(typepay).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! la typepay a été enregistré.")
            mutate(typepayService.api.GET)
        })
    }

    const upd_typepay = async function(typepay:Typepay){
        const res = await typepayService.update(typepay).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! la typepay a été modifié.")
            mutate(typepayService.api.GET)
        })
    }

    const del_typepay = async function(typepay:Typepay){
        const res = await typepayService.delete(typepay).catch(handleError);
        handleSucces(res, (d:any) =>{
            message.success("Operation reussie ! la typepay a été supprimé.")
            mutate(typepayService.api.GET)
        })
    }
    // ===========================================

    return {
        liste_typepay,
        add_typepay,
        upd_typepay,
        del_typepay,

        selectedData, 
        isDvisible, 
        actionTitle,

        onClose,
        showDrawer,
        typeForm
    }
}

export default useTypepay;


const handleError = function (error:any) {
    if (error.response) {
        message.warning("Element existant ! cette typepay existe déja sur la plateforme.")
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