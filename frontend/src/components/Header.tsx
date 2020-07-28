import React from "react"
import styled, { StyledComponent } from "styled-components"
import { Button, Dropdown, Menu as _Menu, Icon } from "semantic-ui-react"
import { Link, withRouter } from "react-router-dom"
import { RouteComponentProps } from "react-router"
import { ApolloClient } from "@apollo/client"

import useMapContext from "../context/map"
import { routes } from "../constants/routes"
import useCurrentUserContext from "../context/currentUser"
import layoutContext from "../context/layout"
import { MapStyle } from "../constants/common"
import useWindowSize from "../hooks/useWindowSize"

const Menu = styled(_Menu)`
	margin: 0 !important;
	padding: 0 8px;

	@media screen and (max-width: ${({ theme }) => theme.sizes.sm}px) {
		padding: 0;

`

const LogoLink: StyledComponent<any, any> = styled(Link)`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-right: 10px;
	h1 {
		margin: 0;
		color: #d01919;
	}
	@media screen and (max-width: ${({ theme }) => theme.sizes.sm}px) {
		margin-right: 0;
		h1 {
			font-size: 9px;
			margin-right: 5px;
		}
	}
`

interface Props extends RouteComponentProps {
	client: ApolloClient<any>
}

const items = [MapStyle.street, MapStyle.light, MapStyle.dark, MapStyle.outdors]

const Header: React.FC<Props> = ({ location: { pathname }, client }) => {
	const [currentUser, setCurrentUser] = useCurrentUserContext()
	const { reset, setMapStyle, mapStyle } = useMapContext()
	const { setHeaderHeight, headerHeight } = layoutContext()
	const headerRef = React.useRef<HTMLDivElement>(null)
	const { width, height } = useWindowSize()

	React.useLayoutEffect(() => {
		setTimeout(() => {
			if (headerRef.current !== null) {
				setHeaderHeight(headerRef.current.offsetHeight)
			}
		}, 1000)
	}, [height, headerRef.current])

	return (
		<div ref={headerRef}>
			<Menu color="teal" inverted size={width <= 768 ? "tiny" : "small"}>
				<LogoLink to={routes.ROOT}>
					<Icon name="map marker alternate" size="big" color="red" />
					<h1>Geo Pins</h1>
				</LogoLink>
				<Menu.Item name="home" active={true} onClick={() => {}} />
				<Menu.Menu position="right">
					{currentUser && (
						<Dropdown item text="Map style">
							<Dropdown.Menu>
								{items.map((e: MapStyle) => (
									<Dropdown.Item
										key={e}
										active={e === mapStyle}
										onClick={() => setMapStyle(e)}
									>
										{e}
									</Dropdown.Item>
								))}
							</Dropdown.Menu>
						</Dropdown>
					)}
					<Menu.Item>
						{!currentUser ? (
							<>
								<Button.Group>
									<Button
										active={pathname === routes.SIGN_UP}
										as={Link}
										to={routes.SIGN_UP}
										primary
									>
										Sign Up
									</Button>
									<Button.Or text="or" />
									<Button
										active={pathname === routes.LOG_IN}
										as={Link}
										to={routes.LOG_IN}
										secondary
									>
										Sign In
									</Button>
								</Button.Group>
							</>
						) : (
							<Button
								onClick={async () => {
									reset()
									await client.resetStore()
									setCurrentUser(null)
									localStorage.removeItem("token")
									window.location.reload()
								}}
								color="red"
							>
								Log Out
							</Button>
						)}
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		</div>
	)
}

export default withRouter(Header)
