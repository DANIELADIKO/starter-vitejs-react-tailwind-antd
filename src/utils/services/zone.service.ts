import configData from "../../assets/config/production.json";
import Caller from "../../core/objects/Caller";
import Zone from "../models/zone.model";


export default class ZoneService {
    // private apiCaller:Caller
    api:any= {}
    constructor() {
        // Caller = new Caller()
        this.api = configData.API_ENDPOINTS.ZONE
    }

    get(param?:any){
        return (url:string) => Caller.get(url, param)
    }

    post(data:Zone,param?:any){
        return Caller.post(this.api.ADD, data ,param)
    }

    update(data:Zone,param?:any){ // SPECIAL API ONLY FOR ROOT
        return Caller.put(this.api.UPD+"/"+data.zoneid, data ,param)
    }


    delete(data:Zone){
        return Caller.delete(this.api.DEL+"/"+data.zoneid )
    }

}
