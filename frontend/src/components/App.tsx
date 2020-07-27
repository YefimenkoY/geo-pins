import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import ProvidersWrapper from "../ProvidersWrapper"

import Root from "./Root"
import GlobalStyles from "../styles/global-styles"
import "semantic-ui-css/semantic.min.css"

const App: React.FC = () => (
	<ProvidersWrapper>
		<Router>
			<GlobalStyles />
			<Root />
		</Router>
	</ProvidersWrapper>
)

export default App
