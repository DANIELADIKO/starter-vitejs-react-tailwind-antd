import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import {  message, } from "antd";
import { AxiosResponse } from "axios";
import { RcFile } from "antd/lib/upload";
import Typepropriete from "../utils/models/typepropriete.model";
import TypeproprieteService from "../utils/services/typepropriete.service";
import { getBase64 } from "../utils/helpers/img.helper";



const typeproprieteService = new TypeproprieteService();

const useTypepropriete = () => {

    //STATE
    const [selectedData, setselectedData] = useState<Typepropriete>();
    const [isDvisible, setDVisible] = useState(false);
    const [typeForm, settypeForm] = useState(0); // 0 pour add | 1 pour modifier
    const [actionTitle, setActionTitle] = useState("Ajouter");

    const [imgUrl, setImgUrl] = useState("");
    const [file, setFile] = useState<RcFile | undefined>(undefined); // Variable pour stocker les fichier
    
  
    const showDrawer = (data?: Typepropriete) => {
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
        setImgUrl("")
        setselectedData(undefined)
      };


    // CACHED DATA
    const liste_typepropriete =  useSWR(typeproprieteService.api.GET, typeproprieteService.get(), {});

    //=================================== CRUD
    const add_typepropriete = async function(typepropriete:Typepropriete){
        const res = await typeproprieteService.post(typepropriete).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le type de propriete a été enregistré.")
            mutate(typeproprieteService.api.GET)
        })
    }

    const upd_typepropriete = async function(typepropriete:Typepropriete){
        const res = await typeproprieteService.update(typepropriete).catch(handleError);
        handleSucces(res,(d:any) =>{
            message.success("Operation reussie ! le type de propriete a été modifié.")
            mutate(typeproprieteService.api.GET)
        })
    }

    const del_typepropriete = async function(typepropriete:Typepropriete){
        const res = await typeproprieteService.delete(typepropriete).catch(handleError);
        handleSucces(res, (d:any) =>{
            message.success("Operation reussie ! le type de propriete a été supprimé.")
            mutate(typeproprieteService.api.GET)
        })
    }
    // ===========================================


  // =========================================== FORM FUNCTIONS

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    let typepropriete: Typepropriete = selectedData as Typepropriete;
    typepropriete = { ...typepropriete, ...values };
    if (file) {
      typepropriete.typeproprieteicone = "";
    }
    console.log(typepropriete);
    if (typeForm === 0) {
      // Add
      await add_typepropriete(typepropriete);
    } else {
      await upd_typepropriete(typepropriete);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  const beforeUpload = (fle: RcFile, FileList: RcFile[]) => {
    // Verifier le type de fichier
    const isJpgOrPng = fle.type === "image/jpeg" || fle.type === "image/png";
    if (!isJpgOrPng) {
      message.warning("Seulement les fichiers de type JPG/PNG sont autorisés!");
      return false;
    }
    // Verifier la taille des images ( inferierure a 2MB)
    const isLt2M = fle.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("La taille de l'image ne doit exceder 2MB!");
      return false;
    }
    // Stocker le fichier dans la variable
    setFile(fle);

    getBase64(fle,(imgUrl:string)=> {
      setImgUrl(imgUrl)
    })
    //  Specifier de ne pas uploader directement le fichier
    return false;
  };

  

  // ===========================================



    return {
        liste_typepropriete,
        onFinish,
        onFinishFailed,
        del_typepropriete,

        selectedData, 
        isDvisible, 
        actionTitle,

        onClose,
        showDrawer,
        imgUrl,
        beforeUpload
        
    }
}

export default useTypepropriete;


const handleError = function (error:any) {
    if (error.response) {
        message.warning("Element existant ! ce type de propriete existe déja sur la plateforme.")
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