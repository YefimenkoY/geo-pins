import React from "react"
import { ApolloProvider } from "@apollo/client"
import { ThemeProvider } from "styled-components"

import { Provider as MapProvider } from "context/map"
import { Provider as LayoutProvider } from "context/layout"
import client from "./client"
import theme from "./constants/theme"

interface Props {
	children: React.ReactChild
}

const ProvidersWrapper: React.FC<Props> = ({ children }) => (
	<ApolloProvider client={client}>
		<ThemeProvider theme={theme}>
			<MapProvider>
				<LayoutProvider>{children}</LayoutProvider>
			</MapProvider>
		</ThemeProvider>
	</ApolloProvider>
)

export default ProvidersWrapper
