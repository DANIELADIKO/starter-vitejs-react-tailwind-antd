import configData from "../../assets/config/production.json";
import Caller from "../../core/objects/Caller";
import {SuperficieRule} from "../models/superficierule.model";


export default class SuperficieRuleService {
    // private apiCaller:Caller
    api:any= {}
    constructor() {
        this.api = configData.API_ENDPOINTS.SUPERFICIERULE
    }

    get(url:string, ...rest:any[]){
        let parms:any = {}
        if(rest && rest[0]) parms["type"] =  rest[0]
        console.log(url,parms);
        
        return Caller.get(url,parms)
    }

    post(data:SuperficieRule,param?:any){
        return Caller.post(this.api.ADD, data ,param)
    }

    delete(data:SuperficieRule){
        return Caller.delete(this.api.DEL+"/"+ data.typepropriete?.typeproprieteid +"/"+data.superficie?.superficieid )
    }



}
