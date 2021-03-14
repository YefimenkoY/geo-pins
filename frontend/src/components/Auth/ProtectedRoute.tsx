import React, { JSXElementConstructor } from "react"
import {
	Route,
	Redirect,
	RouteProps,
	RouteComponentProps,
} from "react-router-dom"

import { routes } from "../../constants/routes"

interface Props<P> extends RouteProps {
	component: JSXElementConstructor<P>
	isLoggedIn: boolean
	refetch?: () => void
}

const ProtectedRoute: React.FC<Props<RouteComponentProps<any>>> = ({
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
						pathname: routes.LOG_IN,
					}}
				/>
			)
		}
	/>
)

export default ProtectedRoute
