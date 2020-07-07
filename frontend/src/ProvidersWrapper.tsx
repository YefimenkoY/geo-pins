import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";

import useCurrentUserContext from "./context/currentUser";
import useMapContext from "./context/map";
import client from "./client";
import theme from "./constants/theme";

interface IProps {
  children: any;
}

const ProvidersWrapper: React.FC<IProps> = ({ children }) => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <useCurrentUserContext.Provider>
        <useMapContext.Provider>{children}</useMapContext.Provider>
      </useCurrentUserContext.Provider>
    </ThemeProvider>
  </ApolloProvider>
);

export default ProvidersWrapper;
