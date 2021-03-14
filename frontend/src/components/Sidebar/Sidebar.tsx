import React from "react"
import styled from "styled-components"

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

const Sidebar = ({
	isLoggedIn,
}: {
	isLoggedIn: boolean
}): React.ReactElement => {
	return <Box>{!isLoggedIn ? <NoContent /> : <SidebarContent />}</Box>
}

export default Sidebar
