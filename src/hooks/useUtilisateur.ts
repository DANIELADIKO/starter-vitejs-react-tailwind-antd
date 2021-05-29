import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import {  message, } from "antd";
import { AxiosResponse } from "axios";
import UtilisateurService from "../utils/services/utilisateur.service";
import Utilisateur from "../utils/models/utilisateur.model";



const utilisateurService = new UtilisateurService();

const useUtilisateur = (type:string) =>  {

    //STATE
    const [selectedData, setselectedData] = useState<Utilisateur>();
    const [isDvisible, setDVisible] = useState(false);
    const [typeForm, settypeForm] = useState(0); // 0 pour add | 1 pour modifier
    const [actionTitle, setActionTitle] = useState("Ajouter");


    const showDrawer = (data?: Utilisateur) => {
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
        setTimeout(() => {
          setselectedData(undefined)
        }, 100);
        settypeForm(0)
        
      };


    // CACHED DATA
    const liste_utilisateur =  useSWR([utilisateurService.api.GET,type], utilisateurService.get);

    //=================================== CRUD
    const add_utilisateur = async function(utilisateur:Utilisateur){
        
        const res = await utilisateurService.post(utilisateur,{ social: false, isadmin : true}).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le utilisateur a été enregistré.")
            mutate([utilisateurService.api.GET, type])
        })
    }

    const upd_utilisateur = async function(utilisateur:Utilisateur){
        const res = await utilisateurService.update(utilisateur).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le utilisateur a été modifié.")
            mutate([utilisateurService.api.GET, type])
        })
    }

    const del_utilisateur = async function(utilisateur:Utilisateur){
        const res = await utilisateurService.delete(utilisateur).catch(handleError);
        handleSucces(res, (d:any) =>{
            message.success("Operation reussie ! le utilisateur a été supprimé.")
            mutate([utilisateurService.api.GET, type])
        })
    }
    // ===========================================



  // =========================================== FORM FUNCTIONS

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    delete values.cutilisateurpassword
    let utilisateur: Utilisateur = selectedData as Utilisateur;
    utilisateur = { ...utilisateur, ...values };
    console.log(utilisateur);
    if (typeForm === 0) {
      // Add
      await add_utilisateur(utilisateur);
    } else {
      await upd_utilisateur(utilisateur);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // ===========================================


    return {
        liste_utilisateur,
        onFinish,
        onFinishFailed,
        del_utilisateur,

        selectedData, 
        isDvisible, 
        actionTitle,

        onClose,
        showDrawer,
        typeForm
    }
}

export default useUtilisateur;


const handleError = function (error:any) {
    if (error.response) {
        message.warning("Element existant ! ce utilisateur existe déja sur la plateforme.")
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