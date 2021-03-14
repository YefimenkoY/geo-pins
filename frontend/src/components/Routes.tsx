import React from "react"
import { Switch, Route } from "react-router-dom"
import { useApolloClient, useQuery } from "@apollo/client"

import Layout from "components/Layout"
import ProtectedRoute from "components/Auth/ProtectedRoute"
import { routes } from "../constants/routes"
import SignIn from "components/Auth/SignIn"
import SignUp from "components/Auth/SignUp"
import Main from "components/Main"
import PinPage from "components/Pin/PinPage"
import FullScreenLoader from "components/FullScreenLoader"
import AllPinsPage from "components/Pin/AllPinsPage"
import { GET_CURRENT_USER_QUERY as CurrentUser } from "types/GET_CURRENT_USER_QUERY"
import { GET_CURRENT_USER_QUERY } from "components/Auth/queries"

const Routes = (): React.ReactElement => {
	const client = useApolloClient()

	const { loading, data, refetch: fetchCurrentUser } = useQuery<CurrentUser>(
		GET_CURRENT_USER_QUERY,
	)

	const isLoggedIn = Boolean(data?.CurrentUser)

	return loading ? (
		<FullScreenLoader />
	) : (
		<Switch>
			<Layout {...{ isLoggedIn, client }}>
				<Route
					exact
					path={routes.LOG_IN}
					render={() => <SignIn {...{ fetchCurrentUser }} />}
				/>
				<Route
					path={routes.SIGN_UP}
					exact
					render={() => <SignUp fetchCurrentUser={fetchCurrentUser} />}
				/>
				<ProtectedRoute
					path={routes.ROOT}
					isLoggedIn={isLoggedIn}
					component={Main}
					exact
				/>
				<ProtectedRoute
					path={routes.ALL_PINS}
					isLoggedIn={isLoggedIn}
					component={AllPinsPage}
					exact
				/>
				<ProtectedRoute
					path={routes.PIN_PAGE}
					isLoggedIn={isLoggedIn}
					component={PinPage}
					exact
				/>
				<Route render={() => <div>Not Found</div>} />
			</Layout>
		</Switch>
	)
}

export default Routes
