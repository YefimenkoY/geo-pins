import { getNearbyFeatures } from "./../api/map"
import { Feature } from "types/map"
import { MapStyle } from "constants/common"
import { useState, useEffect } from "react"
import constate from "constate"
import { GET_PINS_QUERY_GetPins } from "types/GET_PINS_QUERY"
import { getHours } from "date-fns"
import { Maybe } from "types/common"

export const DEFAULT_ZOOM = 5

const DEFAULT_MAP_POSITION = {
	latitude: 49.39946862914821,
	longitude: 31.20184585183082,
	zoom: DEFAULT_ZOOM,
}

type MapPosition = typeof DEFAULT_MAP_POSITION

const [Provider, useMapContext] = constate(() => {
	const [features, setFeatures] = useState<Array<Feature>>([])
	const [currentPosition, setCurrentPosition] = useState<Maybe<MapPosition>>(
		DEFAULT_MAP_POSITION,
	)
	const [mapPosition, setMapPosition] = useState<Maybe<MapPosition>>()
	const [currentPin, setCurrentPin] = useState<Maybe<Feature>>()
	const [pins, setPins] = useState<GET_PINS_QUERY_GetPins[]>([])
	const [mapStyle, setMapStyle] = useState<MapStyle>(
		getHours(new Date()) >= 18 ? MapStyle.dark : MapStyle.street,
	)

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			async ({ coords: { latitude, longitude } }) => {
				setMapPosition({
					longitude,
					latitude,
					zoom: DEFAULT_ZOOM,
				})
				setCurrentPosition({ longitude, latitude, zoom: DEFAULT_ZOOM })
				const { data } = await getNearbyFeatures({
					lon: longitude,
					lat: latitude,
				})
				if (data) {
					setFeatures(data.features)
				}
			},
		)
	}, [])

	return {
		currentPosition,
		setCurrentPosition,
		mapPosition,
		setMapPosition,
		currentPin,
		setCurrentPin,
		pins,
		setPins,
		mapStyle,
		setMapStyle,
		features,
		setFeatures,
		reset: () => {
			setCurrentPosition(undefined)
			setMapPosition(undefined)
			setCurrentPin(undefined)
		},
	}
})

export { Provider, useMapContext }
