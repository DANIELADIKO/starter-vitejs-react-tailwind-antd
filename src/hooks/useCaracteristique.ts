import React, { useState, useEffect } from "react";
import CaracteristiqueService from "../utils/services/caracteristique.service";
import useSWR, { mutate } from "swr";
import Caracteristique from "../utils/models/caracteristique.model";
import {  message, } from "antd";
import { AxiosResponse } from "axios";



const caracteristiqueService = new CaracteristiqueService();

const useCaracteristique = () => {

    //STATE
    const [selectedData, setselectedData] = useState<Caracteristique>();
    const [isDvisible, setDVisible] = useState(false);
    const [typeForm, settypeForm] = useState(0); // 0 pour add | 1 pour modifier
    const [actionTitle, setActionTitle] = useState("Ajouter");


    const showDrawer = (data?: Caracteristique) => {
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
    const liste_caracteristique =  useSWR(caracteristiqueService.api.GET, caracteristiqueService.get(), {});

    //=================================== CRUD
    const add_caracteristique = async function(caracteristique:Caracteristique){
        const res = await caracteristiqueService.post(caracteristique).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le type de requete a été enregistré.")
            mutate(caracteristiqueService.api.GET)
        })
    }

    const upd_caracteristique = async function(caracteristique:Caracteristique){
        const res = await caracteristiqueService.update(caracteristique).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le type de requete a été modifié.")
            mutate(caracteristiqueService.api.GET)
        })
    }

    const del_caracteristique = async function(caracteristique:Caracteristique){
        const res = await caracteristiqueService.delete(caracteristique).catch(handleError);
        handleSucces(res, (d:any) =>{
            message.success("Operation reussie ! le type de requete a été supprimé.")
            mutate(caracteristiqueService.api.GET)
        })
    }
    // ===========================================


  // =========================================== FORM FUNCTIONS

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    let caracteristique: Caracteristique = selectedData as Caracteristique;
    caracteristique = { ...caracteristique, ...values };
   
    console.log(caracteristique);
    if (typeForm === 0) {
      // Add
      await add_caracteristique(caracteristique);
    } else {
      await upd_caracteristique(caracteristique);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  

    return {
        liste_caracteristique,
        onFinish,
        onFinishFailed,
        del_caracteristique,

        selectedData, 
        isDvisible, 
        actionTitle,

        onClose,
        showDrawer,
        
    }
}

export default useCaracteristique;


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