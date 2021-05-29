import configData from "../../assets/config/production.json";
import Caller from "../../core/objects/Caller";
import Commodite from "../models/commodite.model";


export default class CommoditeService {
    // private apiCaller:Caller
    api:any= {}
    constructor() {
        // Caller = new Caller()
        this.api = configData.API_ENDPOINTS.COMMODITE
    }

    get(param?:any){
        return (url:string) => Caller.get(url, param)
    }

    post(data:Commodite,param?:any){
        return Caller.post(this.api.ADD, data ,param)
    }

    update(data:Commodite,param?:any){ // SPECIAL API ONLY FOR ROOT
        return Caller.put(this.api.UPD+"/"+data.commoditeid, data ,param)
    }


    delete(data:Commodite){
        return Caller.delete(this.api.DEL+"/"+data.commoditeid )
    }

}
