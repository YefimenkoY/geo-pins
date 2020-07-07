import React from "react"
import MapBox, { Marker, Popup } from "react-map-gl"
import { Icon } from "semantic-ui-react"
import { useQuery } from "@apollo/react-hooks"
import styled from "styled-components"

import { GET_PINS_QUERY } from "./queries"
import useMapContext, { DEFAULT_ZOOM } from "../../context/map"
import { GET_PINS_QUERY_GetPins as IPin } from "../../types/GET_PINS_QUERY"
import PinView from "../Pin/PinView"

const PinIcon = styled(Icon)`
	cursor: pointer;
	transition: all 0.3s;
	&&:hover {
		color: red !important;
		font-size: 30px;
	}
`

const Map = () => {
	const {
		currentPosition,
		setCurrentPosition,
		mapPosition,
		setMapPosition,
		setCurrentPin,
		currentPin,
		pins,
		setPins,
	} = useMapContext()

	useQuery(GET_PINS_QUERY, {
		onCompleted(data) {
			setPins(data.GetPins)
		},
	})

	const handleMapClick = ({ lngLat: [longitude = 0, latitude = 0] }) => {
		setCurrentPosition({
			latitude,
			longitude,
			zoom: DEFAULT_ZOOM,
		})
		setCurrentPin(null)
	}

	return (
		<MapBox
			width="100vw"
			height="calc(100vh - 100px)"
			mapStyle="mapbox://styles/mapbox/dark-v9"
			onClick={handleMapClick}
			{...mapPosition}
			mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN || ""}
			onViewportChange={({ longitude, latitude, zoom }) =>
				setMapPosition({ longitude, latitude, zoom })
			}
		>
			{currentPosition && (
				<Marker {...currentPosition} offsetLeft={-20} offsetTop={-35}>
					<Icon name="map marker alternate" color="green" size="big" />
				</Marker>
			)}
			{pins.map(({ lat, lon, id, ...pin }: IPin) => (
				<Marker
					key={id}
					latitude={+lat}
					longitude={+lon}
					offsetLeft={-17}
					offsetTop={-30}
				>
					<PinIcon
						onClick={() => {
							setCurrentPin({ id, lat, lon, ...pin })
							setMapPosition({
								latitude: +lat,
								longitude: +lon,
								zoom: DEFAULT_ZOOM,
							})
						}}
						name="map marker alternate"
						color="pink"
						size="big"
					/>
				</Marker>
			))}
			{currentPin && (
				<Popup
					latitude={+currentPin.lat}
					longitude={+currentPin.lon}
					closeButton
					closeOnClick={false}
					onClose={() => setCurrentPin(null)}
					anchor="top"
				>
					<PinView />
				</Popup>
			)}
		</MapBox>
	)
}

export default Map
