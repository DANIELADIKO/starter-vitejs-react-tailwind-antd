import configData from "../../assets/config/production.json";
import Caller from "../../core/objects/Caller";
import LoginObject from "../models/loginObject.model";
import Utilisateur from "../models/utilisateur.model";


export default class UtilisateurService {
    // private apiCaller:Caller
    api:any= {}
    constructor() {
        // Caller = new Caller()
        this.api = configData.API_ENDPOINTS.UTILISATEUR
    }

    get(url:string, ...rest:any[]){
        let parms:any = {}
        if(rest && rest[0]) parms["type"] =  rest[0]
        return Caller.get(url,parms)
    }

    post(data:Utilisateur,param?:any){
        return Caller.post(this.api.ADD, data ,param)
    }

    update(data:Utilisateur,param?:any){
        return Caller.put(this.api.UPD+"/"+data.utilisateurid, data ,param)
    }


    delete(data:Utilisateur){
        return Caller.delete(this.api.DEL+"/"+data.utilisateurid )
    }


    // AUTHENTIFICATION

    login(data:LoginObject,param?:any){
        return Caller.post(this.api.CONNECT, data ,param)
    }



}
