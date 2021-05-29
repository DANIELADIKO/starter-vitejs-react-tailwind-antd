import configData from "../../assets/config/production.json";
import Caller from "../../core/objects/Caller";
import Banniere from "../models/banniere.model";


export default class BanniereService {
    // private apiCaller:Caller
    api:any= {}
    constructor() {
        // Caller = new Caller()
        this.api = configData.API_ENDPOINTS.BANNIERE
    }

    get(param?:any){
        return (url:string) => Caller.get(url, param)
    }

    post(data:Banniere,file?:any){
        let formdata = new FormData()
        formdata.append("banniere",JSON.stringify(data))
        if(file){
            formdata.append("file",file)
        }
        return Caller.post(this.api.ADD, formdata)
    }


    update(data:Banniere,file?:any){
        let formdata = new FormData()
        formdata.append("banniere",JSON.stringify(data))
        if(file){
            formdata.append("file",file)
        }
        return Caller.put(this.api.UPD+"/"+data.banniereid, formdata)
    }


    delete(data:Banniere){
        return Caller.delete(this.api.DEL+"/"+data.banniereid )
    }

}
