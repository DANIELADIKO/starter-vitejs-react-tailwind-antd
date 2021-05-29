import configData from "../../assets/config/production.json";

export function imgPath(img:string){
    console.log( img);   
    return  img.replace(configData.imgVar ,configData.imgHttp)
}


export function getBase64(img:Blob, callback:any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }