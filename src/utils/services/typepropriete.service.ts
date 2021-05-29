import configData from "../../assets/config/production.json";
import Caller from "../../core/objects/Caller";
import Typepropriete from "../models/typepropriete.model";


export default class TypeproprieteService {
    // private apiCaller:Caller
    api:any= {}
    constructor() {
        // Caller = new Caller()
        this.api = configData.API_ENDPOINTS.TYPEPROPRIETE
    }

    get(param?:any){
        return (url:string) => Caller.get(url, param)
    }

    post(data:Typepropriete,file?:any){
        let formdata = new FormData()
        formdata.append("typepropriete",JSON.stringify(data))
        if(file){
            formdata.append("file",file)
        }
        return Caller.post(this.api.ADD, formdata)
    }


    update(data:Typepropriete,file?:any){
        let formdata = new FormData()
        formdata.append("typepropriete",JSON.stringify(data))
        if(file){
            formdata.append("file",file)
        }
        return Caller.put(this.api.UPD+"/"+data.typeproprieteid, formdata)
    }

    delete(data:Typepropriete){
        return Caller.delete(this.api.DEL+"/"+data.typeproprieteid )
    }

}
