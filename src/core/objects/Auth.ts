import Utilisateur from "../../utils/models/utilisateur.model"

export const connectedUser = () => {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user as string) as Utilisateur : undefined
}

export const isconnectedUser = () => {
    const user = JSON.parse(localStorage.getItem("user") as string) as Utilisateur 
    return user ? true : false
}


export const setconnectedUser = (user:Utilisateur) => {
    if(!user) return undefined
    localStorage.setItem("user", JSON.stringify(user))
    return true
}



export const logout = () => {
    localStorage.removeItem("user")
    window.location.href= "/"
}