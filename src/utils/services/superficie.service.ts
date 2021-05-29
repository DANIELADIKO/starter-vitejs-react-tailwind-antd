import configData from "../../assets/config/production.json";
import Caller from "../../core/objects/Caller";
import Superficie from "../models/superficie.model";


export default class SuperficieService {
    // private apiCaller:Caller
    api:any= {}
    constructor() {
        this.api = configData.API_ENDPOINTS.SUPERFICIE
    }

    get(url:string, ...rest:any[]){
        let parms:any = {}
        if(rest && rest[0]) parms["type"] =  rest[0]
        console.log(url,parms);
        
        return Caller.get(url,parms)
    }

    post(data:Superficie,param?:any){
        return Caller.post(this.api.ADD, data ,param)
    }

    update(data:Superficie,param?:any){
        return Caller.put(this.api.UPD+"/"+data.superficieid, data ,param)
    }


    delete(data:Superficie){
        return Caller.delete(this.api.DEL+"/"+data.superficieid )
    }



}
