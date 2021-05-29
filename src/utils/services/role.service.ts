import configData from "../../assets/config/production.json";
import Caller from "../../core/objects/Caller";
import Role from "../models/role.model";


export default class RoleService {
    // private apiCaller:Caller
    api:any= {}
    constructor() {
        // Caller = new Caller()
        this.api = configData.API_ENDPOINTS.ROLE
    }

    get(url:string, ...rest:any[]){
        let parms:any = {}
        if(rest && rest[0]) parms["type"] =  rest[0]
        return Caller.get(url,parms)
    }
    post(data:Role,param?:any){
        return Caller.post(this.api.ADD, data ,param)
    }

    update(data:Role,param?:any){
        return Caller.put(this.api.UPD+"/"+data.roleid, data ,param)
    }


    delete(data:Role){
        return Caller.delete(this.api.DEL+"/"+data.roleid )
    }

}
