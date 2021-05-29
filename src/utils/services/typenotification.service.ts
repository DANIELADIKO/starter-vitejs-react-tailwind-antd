import configData from "../../assets/config/production.json";
import Caller from "../../core/objects/Caller";
import Typenotification from "../models/typenotification.model";


export default class TypenotificationService {
    // private apiCaller:Caller
    api:any= {}
    constructor() {
        // Caller = new Caller()
        this.api = configData.API_ENDPOINTS.TYPENOTIFICATION
    }

    get(param?:any){
        return (url:string) => Caller.get(url, param)
    }

    post(data:Typenotification,param?:any){
        return Caller.post(this.api.ADD, data ,param)
    }

    update(data:Typenotification,param?:any){ // SPECIAL API ONLY FOR ROOT
        let dt = {status : data.typenotificationid}
        return Caller.get(this.api.UPD+"/"+data.typenotificationid, dt )
    }


    delete(data:Typenotification){
        return Caller.delete(this.api.DEL+"/"+data.typenotificationid )
    }

}
