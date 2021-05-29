import configData from "../../assets/config/production.json";
import Caller from "../../core/objects/Caller";
import { Categoriearticle } from "../models/categoriearticle.model";

export default class CategoriearticleService {
    // private apiCaller:Caller
    api:any= {}
    constructor() {
        // Caller = new Caller()
        this.api = configData.API_ENDPOINTS.CATEGORIEARTICLE
    }

    get(url:string, ...rest:any[]){
        let parms:any = {}
        // if(rest && rest[0]) parms["type"] =  rest[0]
        return Caller.get(url,parms)
    }
    post(data:Categoriearticle,param?:any){
        return Caller.post(this.api.ADD, data ,param)
    }

    update(data:Categoriearticle,param?:any){
        return Caller.put(this.api.UPD+"/"+data.categoriearticleid, data ,param)
    }


    delete(data:Categoriearticle){
        return Caller.delete(this.api.DEL+"/"+data.categoriearticleid )
    }

}
