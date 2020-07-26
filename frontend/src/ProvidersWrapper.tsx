import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import { ThemeProvider } from "styled-components"

import useCurrentUserContext from "./context/currentUser"
import useMapContext from "./context/map"
import client from "./client"
import theme from "./constants/theme"

interface Props {
	children: any
}

const [CurrentUserProvider] = useCurrentUserContext
const [MapProvider] = useMapContext

const ProvidersWrapper: React.FC<Props> = ({ children }) => (
	<ApolloProvider client={client}>
		<ThemeProvider theme={theme}>
			<CurrentUserProvider>
				<MapProvider>{children}</MapProvider>
			</CurrentUserProvider>
		</ThemeProvider>
	</ApolloProvider>
)

export default ProvidersWrapper
