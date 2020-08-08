import React from "react"
import styled from "styled-components"

import useCurrentUserContext from "context/user"
import NoContent from "./NoContent"
import SidebarContent from "./SidebarContent"

const Box = styled.div`
	width: 100%;
	height: 100%;
	span {
		color: #ccc;
	}

	.segment {
		height: 100%;
	}
`

const Sidebar = () => {
	const [currentUser] = useCurrentUserContext()

	return <Box>{!currentUser ? <NoContent /> : <SidebarContent />}</Box>
}

export default Sidebar
