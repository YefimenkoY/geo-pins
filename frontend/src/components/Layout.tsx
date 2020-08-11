import React from "react"
import styled from "styled-components"
import { ApolloClient } from "@apollo/client"
import { Menu, Sidebar } from "semantic-ui-react"

import Header from "./Header"
import SidebarContent from "./Sidebar"
import layoutContext from "context/layout"

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
	client: ApolloClient<any>
	children: any
}

const Layout: React.FC<Props> = ({ children, client }) => {
	const { sidebarOpen } = layoutContext()

	return (
		<Box>
			<Header client={client} />
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
					<SidebarContent />
				</Sidebar>
				<Sidebar.Pusher>{children}</Sidebar.Pusher>
			</Sidebar.Pushable>
		</Box>
	)
}
export default Layout
