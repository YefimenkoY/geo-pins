import { getNearbyFeatures } from "./../api/map"
import { Feature } from "./../types/map"
import { MapStyle } from "./../constants/common"
import { useState, useEffect } from "react"
import createUseContext from "constate"
import { GET_PINS_QUERY_GetPins } from "../types/GET_PINS_QUERY"
import { getHours } from "date-fns"

export const DEFAULT_ZOOM = 5
const DEFAULT_MAP_POSITION: any = {
	latitude: 49.39946862914821,
	longitude: 31.20184585183082,
	zoom: DEFAULT_ZOOM,
}

export default createUseContext(() => {
	const [features, setFeatures] = useState<Array<Feature>>([])
	const [currentPosition, setCurrentPosition] = useState(DEFAULT_MAP_POSITION)
	const [mapPosition, setMapPosition] = useState({})
	const [currentPin, setCurrentPin] = useState<Feature | null>(null)
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
			setCurrentPosition(null)
			setMapPosition({})
			setCurrentPin(null)
		},
	}
})
