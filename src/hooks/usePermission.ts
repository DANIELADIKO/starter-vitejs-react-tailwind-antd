import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import {  message, } from "antd";
import { AxiosResponse } from "axios";
import Permission from "../utils/models/permission.model";
import PermissionService from "../utils/services/permission.service";



const permissionService = new PermissionService();

const usePermission = () => {

    //STATE
    const [selectedData, setselectedData] = useState<Permission|undefined>();
    const [isDvisible, setDVisible] = useState(false);
    const [typeForm, settypeForm] = useState(0); // 0 pour add | 1 pour modifier
    const [actionTitle, setActionTitle] = useState("Ajouter");


    const showDrawer = (data?: Permission) => {
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
    const liste_permission =  useSWR(permissionService.api.GET, permissionService.get(), {});

    //=================================== CRUD
    const add_permission = async function(permission:Permission){
        const res = await permissionService.post(permission).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! la permission a été enregistré.")
            mutate(permissionService.api.GET)
        })
    }

    const upd_permission = async function(permission:Permission){
        const res = await permissionService.update(permission).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! la permission a été modifié.")
            mutate(permissionService.api.GET)
        })
    }

    const del_permission = async function(permission:Permission){
        const res = await permissionService.delete(permission).catch(handleError);
        handleSucces(res, (d:any) =>{
            message.success("Operation reussie ! la permission a été supprimé.")
            mutate(permissionService.api.GET)
        })
    }
    // ===========================================

    return {
        liste_permission,
        add_permission,
        upd_permission,
        del_permission,

        selectedData, 
        isDvisible, 
        actionTitle,

        onClose,
        showDrawer,
        typeForm
    }
}

export default usePermission;


const handleError = function (error:any) {
    if (error.response) {
        message.warning("Element existant ! cette permission existe déja sur la plateforme.")
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