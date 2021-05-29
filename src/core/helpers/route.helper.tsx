import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isconnectedUser } from "../objects/Auth";
import IRoute from "../objects/IRoute";



// 
// FONCTION DE CREATION DES ROUTES DE CONTENU
// @parent : ! TRES IMPORTANT ! permet de definir le parent des sous pages qui seront 
// affiches  
// 
export const createRoute = (route: IRoute, ind: number, parent:string=''):any => {
  let resultsRoutes :any[] = []
  if (route.redirect && route.redirect.length > 0 ) {
    resultsRoutes.push(
      <Redirect  exact from={`${parent}${route.path}`} to={`${parent}${route.path}${route.redirect}`} /> 
    );
  }

  if (route.children && route.children.length > 0) {
    resultsRoutes.push(...route.children.map((i_route, idx) => createRoute(i_route, idx, `${parent}${route.path}`)))
  } else if(route.component)  {
    resultsRoutes.push (
      <Route
          key={ind}
          exact={route.exact}
          path={`${parent}${route.path}`}
          render={(props) => (
            <route.component {...props} />
          )}
        />
    );
  }
  return resultsRoutes
};






// 
// FONCTION DE CREATION DES ROUTES DE CONTENU
// @parent : ! TRES IMPORTANT ! permet de definir le parent des sous pages qui seront 
// affiches  
// 
export const createProtectedRoute = (route: IRoute, ind: number, parent:string=''):any => {
  let resultsRoutes :any[] = []

  if (!isconnectedUser() ) {
    resultsRoutes.push(
      <Redirect  exact from={`${parent}${route.path}`} to={`/401`} /> 
    );
    return resultsRoutes
  }
  // Verifier si l'utilisateur a les droits

  // Ajouter la page
  return createRoute(route, ind, parent);
};
