import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import ProvidersWrapper from "../ProvidersWrapper"

import Routes from "./Routes"
import GlobalStyles from "../styles/global-styles"
import "semantic-ui-css/semantic.min.css"

export default (): React.ReactElement => (
	<ProvidersWrapper>
		<Router>
			<GlobalStyles />
			<Routes />
		</Router>
	</ProvidersWrapper>
)
