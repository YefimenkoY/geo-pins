import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { Dimmer, Loader, Segment } from "semantic-ui-react"

import Layout from "./components/Layout"
import ProtectedRoute from "./components/Auth/ProtectedRoute"
import { routes } from "./constants/routes"
import useCurrentUserContext from "./context/currentUser"
import { GET_CURRENT_USER_QUERY } from "./components/Auth/queries"
import SignIn from "./components/Auth/SignIn"
import SignUp from "./components/Auth/SignUp"
import Main from "./components/Main"

const Routes = () => {
	const [currentUser, setCurrentUser] = useCurrentUserContext()
	const { loading, data, refetch, client } = useQuery(GET_CURRENT_USER_QUERY, {
		// notifyOnNetworkStatusChange: true,
		// onCompleted(user) {
		// 	console.log(user)
		// 	if (user) setCurrentUser(user)
		// },
	})

	React.useEffect(() => {
		console.log(data)
		if (data) setCurrentUser(data.CurrentUser)
	}, [
		data,
		// setCurrentUser,
	])

	if (loading) {
		return (
			<Segment style={{ height: "100vh" }}>
				<Dimmer active>
					<Loader />
				</Dimmer>
			</Segment>
		)
	}

	return (
		<Switch>
			<Layout client={client}>
				<Route
					path={routes.LOG_IN}
					render={props =>
						currentUser ? (
							<Redirect to={routes.ROOT} />
						) : (
							<SignIn refetch={refetch} {...props} />
						)
					}
				/>
				<ProtectedRoute
					path={routes.ROOT}
					isLoggedIn={!!currentUser}
					refetch={refetch}
					component={Main}
					exact
				/>
				<Route path={routes.SIGN_UP} refetch={refetch} component={SignUp} />
			</Layout>
		</Switch>
	)
}

export default Routes
