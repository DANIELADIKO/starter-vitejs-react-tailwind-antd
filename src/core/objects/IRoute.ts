export default interface IRoute {
    path:string;
    name:string;
    component?:any,
    layout?:any,
    exact?:boolean,
    redirect?:string,
    strict?:boolean
    children?:IRoute[]
}