import React from 'react'
import IRoute from '../core/objects/IRoute';


//////////////// Pages
const DashboardPage = React.lazy(() => import('../pages/Dashboard'));

// Gestion Utilisateurs
const Utilisateur = React.lazy(() => import('../pages/gestion-utilisateurs/Utilisateur'));
const Administrateur = React.lazy(() => import('../pages/gestion-utilisateurs/Administrateur'));
const Banniere = React.lazy(() => import('../pages/gestion-utilisateurs/Bannieres'));

// Blog
const Articles = React.lazy(() => import('../pages/gestion-blog/Articles'));
const Categorierticle = React.lazy(() => import('../pages/gestion-blog/Categorierticle'));


// Parametres
const ModeAuth = React.lazy(() => import('../pages/Parametres/Type-auth'));
const Role = React.lazy(() => import('../pages/Parametres/Role'));
const Typezone = React.lazy(() => import('../pages/Parametres/Type-zone'));
const Typepropriete = React.lazy(() => import('../pages/Parametres/Type-propriete'));
const Typerequete = React.lazy(() => import('../pages/Parametres/Type-requete'));
const Commodite = React.lazy(() => import('../pages/Parametres/commodite'));
const Caracteristique = React.lazy(() => import('../pages/Parametres/caracteristique'));
const Zone = React.lazy(() => import('../pages/Parametres/Zone'));

const Permission = React.lazy(() => import('../pages/Parametres/Permission'));
const Typenotification = React.lazy(() => import('../pages/Parametres/Type-notification'));
const Typepay = React.lazy(() => import('../pages/Parametres/Type-pay'));
const SuperficieruleScreen = React.lazy(() => import('../pages/Parametres/Superficie-rule'));

const Connexions = React.lazy(() => import('../pages/Historiques/Connexions'));

// const Role = React.lazy(() => import('../pages/Parametres/Role'));
// const Role = React.lazy(() => import('../pages/Parametres/Role'));
// const Role = React.lazy(() => import('../pages/Parametres/Role'));


// Router Table 
const routes:IRoute[] = [
    {
        path:"/",
        name:"Dashboard",
        exact:true,
        component:DashboardPage
    },
    {
        path:"/gestion-utilisateurs",
        name:"Gestion Utilisateur",
        exact:true,
        redirect:"/utilisateur",
        children:[
            {
                path:"/administrateur",
                name:"Administrateur",
                exact:true,
                component:Administrateur
            },
            {
                path:"/utilisateur",
                name:"Utilisateurs",
                exact:true,
                component:Utilisateur
            },
            {
                path:"/bannieres",
                name:"Banniere",
                exact:true,
                component:Banniere
            },
        ]
    },
  
    {
        path:"/propositions",
        name:"Propositions",
        exact:true,
        children:[
            {
                path:"/maisons",
                name:"Proprietes",
                exact:true,
                component:ModeAuth
            },
        ]
    },
    {
        path:"/statistiques",
        name:"Statistiques",
        exact:true,
        children:[
            {
                path:"/maisons",
                name:"Proprietes",
                exact:true,
                component:ModeAuth
            },
        ]
    },
    {
        path:"/visites",
        name:"Visites",
        exact:true,
        children:[
            {
                path:"/agenda",
                name:"Agenda",
                exact:true,
                component:ModeAuth
            },
            {
                path:"/video",
                name:"Videos",
                exact:true,
                component:ModeAuth
            },
        ]
    },
    {
        path:"/proprietes",
        name:"Gestion des proprietes",
        exact:true,
        children:[
            {
                path:"/maisons",
                name:"Proprietes",
                exact:true,
                component:ModeAuth
            },
        ]
    },
    {
        path:"/blog",
        name:"Blog",
        exact:true,
        children:[
            {
                path:"/ecrire-article",
                name:"Ecrire",
                exact:true,
                component:ModeAuth
            },
            {
                path:"/categorie-articles",
                name:"Categorie d'Articles",
                exact:true,
                component:Categorierticle
            },
            {
                path:"/articles",
                name:"Articles",
                exact:true,
                component:Articles
            },
        ]
    },
    {
        path:"/historiques",
        name:"Historiques",
        exact:true,
        children:[
            {
                path:"/connexions",
                name:"Connexions",
                exact:true,
                component:Connexions
            },
        ]
    },
    {
        path:"/parametres",
        name:"Parametres",
        exact:true,
        redirect:"/zone",
        children:[
            
            {
                path:"/caracteristiques",
                name:"Caracteristiques",
                exact:true,
                component:Caracteristique
            },
            {
                path:"/commodites",
                name:"Commodités",
                exact:true,
                component:Commodite
            },
            {
                path:"/zone",
                name:"Zone",
                exact:true,
                component:Zone
            },
            {
                path:"/superficie",
                name:"Gestion Superficie",
                exact:true,
                component:SuperficieruleScreen
            },
           
            
            {
                path:"/mode-auth",
                name:"Mode d'Authentification",
                exact:true,
                component:ModeAuth
            },
            {
                path:"/type-notification",
                name:"Type de notification",
                exact:true,
                component:Typenotification
            },
            {
                path:"/mode-pay",
                name:"Mode de paiement",
                exact:true,
                component:Typepay
            },
            {
                path:"/type-requete",
                name:"Type de requete",
                exact:true,
                component:Typerequete
            },
            {
                path:"/type-propriete",
                name:"Type de propriete",
                exact:true,
                component:Typepropriete
            },
            {
                path:"/type-zone",
                name:"Type de zone",
                exact:true,
                component:Typezone
            },
            {
                path:"/role",
                name:"Role",
                exact:true,
                component:Role
            },
            {
                path:"/permissions",
                name:"Permissions",
                exact:true,
                component:Permission
            },
        ]
    },
    
]



export default routes;