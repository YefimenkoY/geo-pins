import React from "react"
import MapBox, { Marker, Popup } from "react-map-gl"
import { Icon } from "semantic-ui-react"
import styled from "styled-components"

import { useMapContext, DEFAULT_ZOOM } from "context/map"
import { useLayoutContext } from "context/layout"
import PinView from "../Pin/PinView"
import { Feature, Color } from "types/map"

import { featureColors } from "../../constants/common"

const PinIcon = styled(Icon)`
	cursor: pointer;
	transition: all 0.3s;
	&&:hover {
		color: red !important;
		font-size: 30px;
	}
`

const Map = (): React.ReactElement => {
	const {
		currentPosition,
		setCurrentPosition,
		mapPosition,
		setMapPosition,
		setCurrentPin,
		currentPin,
		mapStyle,
		features,
	} = useMapContext()
	const { headerHeight, setSidebarOpen } = useLayoutContext()

	React.useEffect(() => {
		setSidebarOpen(true)
	}, [])

	const handleMapClick = ({ lngLat: [longitude = 0, latitude = 0] }) => {
		setCurrentPosition({
			latitude,
			longitude,
			zoom: DEFAULT_ZOOM,
		})
		setCurrentPin(undefined)
	}

	return (
		<MapBox
			width="100vw"
			height={`calc(100vh - ${headerHeight}px)`}
			mapStyle={`mapbox://styles/mapbox/${mapStyle}`}
			onClick={handleMapClick}
			{...mapPosition}
			mapboxApiAccessToken="pk.eyJ1IjoieXJyOTIiLCJhIjoiY2swamV2eTRrMDk0bTNucG5xdGE3YnFmYiJ9.wVtCsbkHfBmgj1mhwu8_1g"
			onViewportChange={({
				longitude,
				latitude,
				zoom,
			}: {
				longitude: number
				latitude: number
				zoom: number
			}) => setMapPosition({ longitude, latitude, zoom })}
		>
			{currentPosition && (
				<Marker {...currentPosition} offsetLeft={-20} offsetTop={-35}>
					<Icon name="map marker alternate" color="green" size="big" />
				</Marker>
			)}
			{(features || []).map((f: Feature) => {
				const {
					id,
					place_type: [type],
					center: [lon, lat],
				} = f
				return (
					<Marker
						key={id}
						latitude={lat}
						longitude={lon}
						offsetLeft={-17}
						offsetTop={-30}
					>
						<PinIcon
							onClick={() => {
								setCurrentPin(f)
								setMapPosition({
									latitude: lat,
									longitude: lon,
									zoom: 4,
								})
							}}
							name="map marker alternate"
							color={featureColors[type] as Color}
							size="big"
						/>
					</Marker>
				)
			})}
			{currentPin && (
				<Popup
					latitude={currentPin.center[1]}
					longitude={currentPin.center[0]}
					closeButton
					closeOnClick={false}
					onClose={() => setCurrentPin(undefined)}
					anchor="top"
				>
					<PinView />
				</Popup>
			)}
		</MapBox>
	)
}

export default Map
