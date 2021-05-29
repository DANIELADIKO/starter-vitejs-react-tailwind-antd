import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import {  message, } from "antd";
import { AxiosResponse } from "axios";
import Typeauth from "../utils/models/typeauth.model";
import TypeauthService from "../utils/services/typeauth.service";



const typeauthService = new TypeauthService();

const useTypeauth = () => {

    //STATE
    const [selectedData, setselectedData] = useState<Typeauth>();
    const [isDvisible, setDVisible] = useState(false);
    const [typeForm, settypeForm] = useState(0); // 0 pour add | 1 pour modifier
    const [actionTitle, setActionTitle] = useState("Ajouter");


    const showDrawer = (data?: Typeauth) => {
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
    const liste_typeauth =  useSWR(typeauthService.api.GET, typeauthService.get(), {});

    //=================================== CRUD
    const add_typeauth = async function(typeauth:Typeauth){
        const res = await typeauthService.post(typeauth).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le typeauth a été enregistré.")
            mutate(typeauthService.api.GET)
        })
    }

    const upd_typeauth = async function(typeauth:Typeauth){
        const res = await typeauthService.update(typeauth).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le typeauth a été modifié.")
            mutate(typeauthService.api.GET)
        })
    }

    const del_typeauth = async function(typeauth:Typeauth){
        const res = await typeauthService.delete(typeauth).catch(handleError);
        handleSucces(res, (d:any) =>{
            message.success("Operation reussie ! le typeauth a été supprimé.")
            mutate(typeauthService.api.GET)
        })
    }
    // ===========================================

    return {
        liste_typeauth,
        add_typeauth,
        upd_typeauth,
        del_typeauth,

        selectedData, 
        isDvisible, 
        actionTitle,

        onClose,
        showDrawer,
        typeForm
    }
}

export default useTypeauth;


const handleError = function (error:any) {
    if (error.response) {
        message.warning("Element existant ! ce typeauth existe déja sur la plateforme.")
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