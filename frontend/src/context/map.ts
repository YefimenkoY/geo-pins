import { MapStyle } from "./../constants/common"
import { useState, useEffect } from "react"
import createUseContext from "constate"
import { GET_PINS_QUERY_GetPins } from "../types/GET_PINS_QUERY"
import { getHours } from "date-fns"

interface IPosition {
	longitude: number
	latitude: number
	zoom: number
}

export const DEFAULT_ZOOM = 5
const DEFAULT_MAP_POSITION: IPosition = {
	latitude: 49.39946862914821,
	longitude: 31.20184585183082,
	zoom: DEFAULT_ZOOM,
}

export default createUseContext(() => {
	const [currentPosition, setCurrentPosition] = useState<IPosition | null>(
		DEFAULT_MAP_POSITION,
	)
	const [mapPosition, setMapPosition] = useState<IPosition | null>(null)
	const [currentPin, setCurrentPin] = useState<GET_PINS_QUERY_GetPins | null>(
		null,
	)
	const [pins, setPins] = useState<GET_PINS_QUERY_GetPins[]>([])
	const [mapStyle, setMapStyle] = useState<MapStyle>(
		getHours(new Date()) >= 18 ? MapStyle.dark : MapStyle.street,
	)

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				setMapPosition({
					longitude,
					latitude,
					zoom: DEFAULT_ZOOM,
				})
				setCurrentPosition({ longitude, latitude, zoom: DEFAULT_ZOOM })
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
		reset: () => {
			setCurrentPosition(null)
			setMapPosition(null)
			setCurrentPin(null)
		},
	}
})
