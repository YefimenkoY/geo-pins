import React from "react"
import { useLazyQuery, NetworkStatus } from "@apollo/client"

import Routes from "../routes"
import { GET_CURRENT_USER_QUERY } from "./Auth/queries"
import useCurrentUserContext from "context/user"
import useMapContext from "context/map"
import layoutContext from "context/layout"
import { useLocation } from "react-router-dom"

export default () => {
	const { pathname } = useLocation()
	const [getUser, { loading, data, refetch, networkStatus }] = useLazyQuery(
		GET_CURRENT_USER_QUERY,
	)
	const [currentUser] = useCurrentUserContext()
	const { currentPosition } = useMapContext()
	const { setSidebarOpen } = layoutContext()

	React.useEffect(() => {
		if (pathname !== "/") {
			return setSidebarOpen(false)
		}
		setSidebarOpen(!!currentPosition && !!currentUser)
	}, [currentPosition, currentUser])

	React.useEffect(() => {
		if (localStorage.getItem("token")) getUser()
	}, [])

	return (
		<Routes
			loading={loading || networkStatus === NetworkStatus.refetch}
			data={data}
			refetch={refetch || getUser}
		/>
	)
}
