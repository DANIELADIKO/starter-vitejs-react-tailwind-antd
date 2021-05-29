import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import {  message, } from "antd";
import { AxiosResponse } from "axios";
import RoleService from "../utils/services/role.service";
import Role from "../utils/models/role.model";



const roleService = new RoleService();

const useRole = () => {

    //STATE
    const [selectedData, setselectedData] = useState<Role>();
    const [isDvisible, setDVisible] = useState(false);
    const [typeForm, settypeForm] = useState(0); // 0 pour add | 1 pour modifier
    const [actionTitle, setActionTitle] = useState("Ajouter");


    const showDrawer = (data?: Role) => {
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
    const liste_role =  useSWR([roleService.api.GET,], roleService.get);
    const liste_role_admin =  useSWR([roleService.api.GET,"admin"], roleService.get, {});
    const liste_role_client =  useSWR([roleService.api.GET, "client"], roleService.get, {});

    //=================================== CRUD
    const add_role = async function(role:Role){
        const res = await roleService.post(role).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le role a été enregistré.")
            mutate(roleService.api.GET)
        })
    }

    const upd_role = async function(role:Role){
        const res = await roleService.update(role).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le role a été modifié.")
            mutate(roleService.api.GET)
        })
    }

    const del_role = async function(role:Role){
        const res = await roleService.delete(role).catch(handleError);
        handleSucces(res, (d:any) =>{
            message.success("Operation reussie ! le role a été supprimé.")
            mutate(roleService.api.GET)
        })
    }
    // ===========================================


  // =========================================== FORM FUNCTIONS

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    let role: Role = selectedData as Role;
    role = { ...role, ...values };
   
    console.log(role);
    if (typeForm === 0) {
      // Add
      await add_role(role);
    } else {
      await upd_role(role);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };



    return {
        liste_role,
        liste_role_admin,
        liste_role_client,
        onFinish,
        onFinishFailed,
        del_role,

        selectedData, 
        isDvisible, 
        actionTitle,

        onClose,
        showDrawer,
        
    }
}

export default useRole;


const handleError = function (error:any) {
    if (error.response) {
        message.warning("Element existant ! ce role existe déja sur la plateforme.")
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