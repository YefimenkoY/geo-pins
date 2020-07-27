import React from "react"
import { resolve } from "path"
import { BrowserRouter as Router } from "react-router-dom"
import { config } from "dotenv"
import Routes from "../routes"
import ProvidersWrapper from "../ProvidersWrapper"

import GlobalStyles from "../styles/global-styles"
import "semantic-ui-css/semantic.min.css"
config({
	path: resolve(__dirname, "../../.env"),
})

const App: React.FC = () => (
	<ProvidersWrapper>
		<Router>
			<GlobalStyles />
			<Routes />
		</Router>
	</ProvidersWrapper>
)

export default App
