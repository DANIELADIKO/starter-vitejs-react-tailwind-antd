import configData from "../../assets/config/production.json";
import Caller from "../../core/objects/Caller";
import Typerequete from "../models/typerequete.model";


export default class TyperequeteService {
    // private apiCaller:Caller
    api:any= {}
    constructor() {
        // Caller = new Caller()
        this.api = configData.API_ENDPOINTS.TYPEREQUETE
    }

    get(param?:any){
        return (url:string) => Caller.get(url, param)
    }

    post(data:Typerequete,param?:any){
        return Caller.post(this.api.ADD, data ,param)
    }

    update(data:Typerequete,param?:any){ // SPECIAL API ONLY FOR ROOT
        return Caller.put(this.api.UPD+"/"+data.typerequeteid, data ,param)
    }


    delete(data:Typerequete){
        return Caller.delete(this.api.DEL+"/"+data.typerequeteid )
    }

}
