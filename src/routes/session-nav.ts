// Liste des routes vers les differentes partie de l'aplication (Session, Admin , ...)

import React from 'react'
import IRoute from '../core/objects/IRoute';


// Layouts
const LoginScreen = React.lazy(() => import('../pages/Login/Login'));
const SiginScreen = React.lazy(() => import('../pages/Login/Signin'));

// Router Table 
const routes:IRoute[] = [
   
    {
        path:"/login",
        name:"Session",
        exact:true,
        component:LoginScreen
    },
   
  
    
    
]



export default routes;