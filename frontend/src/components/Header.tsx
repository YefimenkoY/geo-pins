import React from "react"
import styled from "styled-components"
import { Button, Dropdown, Menu as _Menu, Icon } from "semantic-ui-react"
import { Link, useLocation } from "react-router-dom"
import { ApolloClient } from "@apollo/client"

import { routes } from "../constants/routes"
import { useMapContext } from "context/map"
import { useUserContext } from "context/user"
import { useLayoutContext } from "context/layout"
import { MapStyle } from "../constants/common"
import useWindowSize from "hooks/useWindowSize"

const Menu = styled(_Menu)`
	margin: 0 !important;
	padding: 0 8px;

	@media screen and (max-width: ${({ theme }) => theme.sizes.sm}px) {
		padding: 0;

`

const LogoLink = styled(Link)`
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

interface Props {
	client: ApolloClient<unknown>
}

const items = [MapStyle.street, MapStyle.light, MapStyle.dark, MapStyle.outdors]

export default function ({ client }: Props): React.ReactElement {
	const { pathname } = useLocation()
	const [currentUser, setCurrentUser] = useUserContext()
	const { reset, setMapStyle, mapStyle } = useMapContext()
	const { setHeaderHeight } = useLayoutContext()
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
				<Menu.Menu position="right">
					<Menu.Item
						name="Saved"
						as={Link}
						icon="save"
						active={pathname.includes(routes.ALL_PINS)}
						to={routes.ALL_PINS}
					/>
					{currentUser && (
						<Dropdown disabled={pathname !== routes.ROOT} item text="Map style">
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
									setCurrentUser(undefined)
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
