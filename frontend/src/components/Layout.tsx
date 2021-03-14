import React from "react"
import styled from "styled-components"
import { ApolloClient } from "@apollo/client"
import { Menu, Sidebar } from "semantic-ui-react"

import Header from "./Header"
import SidebarContent from "./Sidebar"
import { useLayoutContext } from "context/layout"

const Box = styled.div`
	width: 100vw;
	position: relative;
	overflow: hidden;
	position: relative;

	.ui.wide.left.sidebar,
	.ui.wide.right.sidebar {
		max-width: 300px !important;
	}
`

interface Props {
	client: ApolloClient<unknown>
	children: React.ReactNode
	isLoggedIn: boolean
}

const Layout: React.FC<Props> = ({ children, ...p }) => {
	const { sidebarOpen } = useLayoutContext()

	return (
		<Box>
			<Header {...p} />
			<Sidebar.Pushable>
				<Sidebar
					as={Menu}
					direction="right"
					width="wide"
					animation="overlay"
					icon="labeled"
					vertical
					visible={sidebarOpen}
				>
					<SidebarContent isLoggedIn={p.isLoggedIn} />
				</Sidebar>
				<Sidebar.Pusher>{children}</Sidebar.Pusher>
			</Sidebar.Pushable>
		</Box>
	)
}
export default Layout
