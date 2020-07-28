import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { useApolloClient } from "@apollo/client"
import { get } from "lodash"

import Layout from "./components/Layout"
import ProtectedRoute from "./components/Auth/ProtectedRoute"
import { routes } from "./constants/routes"
import useCurrentUserContext from "./context/currentUser"
import SignIn from "./components/Auth/SignIn"
import SignUp from "./components/Auth/SignUp"
import Main from "./components/Main"
import { GET_CURRENT_USER_QUERY } from "./types/GET_CURRENT_USER_QUERY"
import PinPage from "./components/Pin/PinPage"
import FullScreenLoader from "./components/FullScreenLoader"

interface Props {
	data: GET_CURRENT_USER_QUERY
	refetch: () => any
	loading: boolean
}

const Routes: React.FC<Props> = ({ data, refetch, loading }) => {
	const client = useApolloClient()
	const user = get(data, "CurrentUser", null)
	const isLoggedIn = Boolean(user)

	const [currentUser, setCurrentUser] = useCurrentUserContext()

	React.useEffect(() => {
		if (user) setCurrentUser(user)
	}, [user])

	return loading ? (
		<FullScreenLoader />
	) : (
		<Switch>
			<Layout client={client}>
				<Route
					path={routes.LOG_IN}
					render={props =>
						isLoggedIn ? (
							<Redirect to={routes.ROOT} />
						) : (
							<SignIn refetch={refetch} {...props} />
						)
					}
				/>
				<Route path={routes.SIGN_UP} refetch={refetch} component={SignUp} />
				<ProtectedRoute
					path={routes.ROOT}
					isLoggedIn={isLoggedIn}
					refetch={refetch}
					component={Main}
					exact
				/>
				<ProtectedRoute
					path={routes.PIN_PAGE}
					isLoggedIn={isLoggedIn}
					component={PinPage}
					exact
				/>
			</Layout>
		</Switch>
	)
}

export default Routes
