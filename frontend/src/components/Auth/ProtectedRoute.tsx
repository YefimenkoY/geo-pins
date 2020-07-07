import React, { JSXElementConstructor } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { routes } from "../../constants/routes";

interface IProps<P> extends RouteProps {
  component: JSXElementConstructor<P>;
  isLoggedIn: boolean;
  refetch: any;
}

const ProtectedRoute: React.FC<IProps<any>> = ({
  component: Component,
  isLoggedIn,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: routes.LOG_IN
          }}
        />
      )
    }
  />
);

export default ProtectedRoute;
