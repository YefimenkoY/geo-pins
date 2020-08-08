import axios from "axios"
import { Feature } from "types/map"

const instance = axios.create({
	baseURL: "https://api.mapbox.com/geocoding/v5",
	params: {
		access_token:
			"pk.eyJ1IjoieXJyOTIiLCJhIjoiY2swamV2eTRrMDk0bTNucG5xdGE3YnFmYiJ9.wVtCsbkHfBmgj1mhwu8_1g",
	},
})

interface Params {
	feature: string
	types: string
}

interface Response {
	data: { features: Feature[] }
}

export const getFeatures = async ({
	feature,
	types,
}: Params): Promise<Response> =>
	await instance.get(`/mapbox.places/${feature}.json`, {
		params: {
			language: "en",
			types,
			limit: 200,
			fuzzyMatch: true,
			access_token:
				"pk.eyJ1IjoieXJyOTIiLCJhIjoiY2swamV2eTRrMDk0bTNucG5xdGE3YnFmYiJ9.wVtCsbkHfBmgj1mhwu8_1g",
		},
	})

export const getNearbyFeatures = async ({
	lon,
	lat,
}: {
	lon: number
	lat: number
}): Promise<Response> =>
	await instance.get(`/mapbox.places/${lon},${lat}.json`, {
		params: {
			language: "en",
			access_token:
				"pk.eyJ1IjoieXJyOTIiLCJhIjoiY2swamV2eTRrMDk0bTNucG5xdGE3YnFmYiJ9.wVtCsbkHfBmgj1mhwu8_1g",
		},
	})
