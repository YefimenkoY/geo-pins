import React from "react"
import styled, { StyledComponent } from "styled-components"
import { Button, Dropdown, Menu as _Menu, Icon } from "semantic-ui-react"
import { Link, withRouter } from "react-router-dom"
import { RouteComponentProps } from "react-router"
import useMapContext from "../context/map"
import { routes } from "../constants/routes"
import useCurrentUserContext from "../context/currentUser"
import { MapStyle } from "../constants/common"

const Menu = styled(_Menu)`
	margin: 0 !important;
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
			font-size: 11px;
		}
	}
`

interface Props extends RouteComponentProps {
	toggleSideBar: React.Dispatch<React.SetStateAction<boolean>>
	client: any
	setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>
}

const items = [MapStyle.street, MapStyle.light, MapStyle.dark, MapStyle.outdors]

const Header: React.FC<Props> = ({
	location: { pathname },
	history,
	client,
	setOpenSideBar,
}) => {
	const [currentUser, setCurrentUser] = useCurrentUserContext()
	const { currentPosition, reset, setMapStyle, mapStyle } = useMapContext()

	React.useEffect(() => {
		setOpenSideBar(!!currentPosition)
	}, [currentPosition])

	return (
		<Menu color="teal" stackable inverted size="small">
			<LogoLink to={routes.ROOT}>
				<Icon name="map marker alternate" size="big" color="red" />
				<h1>Geo Pins</h1>{" "}
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
	)
}

export default withRouter(Header)
