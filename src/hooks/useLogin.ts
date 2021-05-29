import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import {  message, } from "antd";
import { AxiosResponse } from "axios";
import UtilisateurService from "../utils/services/utilisateur.service";
import Utilisateur from "../utils/models/utilisateur.model";
import LoginObject from "../utils/models/loginObject.model";
import { useHistory } from "react-router";
import { setconnectedUser } from "../core/objects/Auth";



const utilisateurService = new UtilisateurService();

const useLogin = (type:string) =>  {

    const history = useHistory();

    //STATE
   
    //=================================== CRUD
    const login_utilisateur = async function(login:LoginObject){
        
        const res = await utilisateurService.login(login,{ social: false, type}).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success(" Connexion autorisée!")
            //Set utilisateur a connected
          if(setconnectedUser(d.data)){
            // redirect
            history.push("/app/")
          }
          
            
        })
    }

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
    let login: LoginObject = values as LoginObject;
    await login_utilisateur(login);
    
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // ===========================================


    return {
        onFinish,
        onFinishFailed,
        del_utilisateur
    }
}

export default useLogin;


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