import React, { Suspense } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import { createRoute } from "../../core/helpers/route.helper";

// import Routes
import routes from "../../routes/session-nav";

interface Props {}


  
const SessionLayout = (props: Props) => {
  return (
   <>
    <Suspense fallback={"lorem"}>
      <Switch>
            {
            routes.map((route, idx) => {
              return createRoute(route, idx, '/session')
            })}
            <Redirect from="*" to="/404" />
          </Switch>
    </Suspense>
   </>
  );
};

export default SessionLayout;
