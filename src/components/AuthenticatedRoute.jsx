import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import {CommonUtil}                     from "../helpers/CommonUtil";

function AuthenticatedRoute({ component: Component, ...rest }) {
  const location = useLocation();
  return (
      <Route {...rest}
        render={
          props => {
            if (CommonUtil.isAuthenticated()) { // logged in so return component
              {console.log('*** authenticated redirected to url.')}
              return <Component {...props} />
            }
            // not logged in so redirect to login page with the return url
            {console.log('*** not authenticated redirected to login.')}
            return <Redirect to={{ pathname: '/login', state: { from: location } }} />

      }} />
  );
}

export { AuthenticatedRoute };
