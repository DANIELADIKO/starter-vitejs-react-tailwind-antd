import configData from "../../assets/config/production.json";
import Caller from "../../core/objects/Caller";
import Typezone from "../models/typezone.model";


export default class TypezoneService {
    // private apiCaller:Caller
    api:any= {}
    constructor() {
        // Caller = new Caller()
        this.api = configData.API_ENDPOINTS.TYPEZONE
    }

    get(param?:any){
        return (url:string) => Caller.get(url, param)
    }

    post(data:Typezone,param?:any){
        return Caller.post(this.api.ADD, data ,param)
    }

    update(data:Typezone,param?:any){ // SPECIAL API ONLY FOR ROOT
        return Caller.put(this.api.UPD+"/"+data.zoneattributid, data ,param)
    }


    delete(data:Typezone){
        return Caller.delete(this.api.DEL+"/"+data.zoneattributid )
    }

}
