import React from 'react';
import { HashRouter, Route, Switch ,Redirect }  from 'react-router-dom';

// import Routes
import routes from "./routes/default-nav"

function App() {
  return (
    <HashRouter>
          <React.Suspense fallback={".... Chargement"}>
            <Switch>
              { routes.map((route, idx) =>  {
                return  <Route key={idx} path={route.path} 
                exact={route.exact} 
                strict={route.strict ? route.strict : false}
                render={props => <route.component {...props} />} /> 
              }) }

              <Redirect to="/session/login" />
              
            </Switch>
          </React.Suspense>
      </HashRouter>
  );
}

export default App;
