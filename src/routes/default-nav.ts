// Liste des routes vers les differentes partie de l'aplication (Session, Admin , ...)

import React from 'react'
import IRoute from '../core/objects/IRoute';


// Layouts
const MainLayout = React.lazy(() => import('../layouts/MainLayout'));
const SessionLayout = React.lazy(() => import('../layouts/SessionLayout'));
const NotFound = React.lazy(() => import('../pages/404/NotFound'));
const Unauthorize = React.lazy(() => import('../pages/404/Unauthorize'));


// Router Table 
const routes:IRoute[] = [
   
   
    
    {
        path:"/404",
        name:"Not Found",
        exact:true,
        component:NotFound
    },
    {
        path:"/401",
        name:"Not Authorize",
        exact:true,
        component:Unauthorize
    },
    {
        path:"/app",
        name:"Home",
        exact:false,
        strict:true,
        component:MainLayout
    },
    {
        path:"/session",
        name:"Session",
        exact:false,
        strict:true,
        component:SessionLayout
    },
    
    
]



export default routes;