import React from "react"
import { useLazyQuery, NetworkStatus } from "@apollo/client"

import Routes from "../routes"
import { GET_CURRENT_USER_QUERY } from "./Auth/queries"
import { Link } from "react-router-dom"
import { routes } from "../constants/routes"

export default () => {
	const [
		getUser,
		{ loading, data, error, refetch, networkStatus },
	] = useLazyQuery(GET_CURRENT_USER_QUERY)

	React.useEffect(() => {
		if (localStorage.getItem("token")) getUser()
	}, [])

	return error ? (
		<h3>
			Error. <Link to={routes.LOG_IN}>Back to login</Link>
		</h3>
	) : (
		<Routes
			loading={loading || networkStatus === NetworkStatus.refetch}
			data={data}
			refetch={refetch || getUser}
		/>
	)
}
