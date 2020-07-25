import React from "react"
import styled from "styled-components"
import { ApolloClient, NormalizedCacheObject } from "apollo-boost"
import { Menu, Sidebar } from "semantic-ui-react"

import Header from "./Header"
import SidebarContent from "./Sidebar"

const Box = styled.div`
	width: 100vw;
	position: relative;
	height: calc(100vh - ${({ theme }) => theme.header.height});
	position: relative;
	.mapboxgl-map {
		height: calc(100vh - ${({ theme }) => theme.header.height}) !important;
	}
`

interface Props {
	client: ApolloClient<NormalizedCacheObject>
	children: any
}

const Layout: React.FC<Props> = ({ children, client }) => {
	const [sidebar, setSidebar] = React.useState(false)
	const onToggle = () => setSidebar(!sidebar)

	return (
		<Box>
			<Header
				toggleSideBar={onToggle}
				setOpenSideBar={setSidebar}
				client={client}
			/>
			<Sidebar.Pushable>
				<Sidebar
					as={Menu}
					direction="right"
					animation="overlay"
					icon="labeled"
					vertical
					visible={sidebar}
				>
					<SidebarContent />
				</Sidebar>
				<Sidebar.Pusher>{children}</Sidebar.Pusher>
			</Sidebar.Pushable>
		</Box>
	)
}
export default Layout
