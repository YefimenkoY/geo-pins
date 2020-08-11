export enum FeatureType {
	country = "country",
	region = "region",
	district = "district",
	place = "place",
	locality = "locality",
	neighborhood = "neighborhood",
	address = "address",
	poi = "poi",
}

export type Center = [number, number]

export interface Feature {
	id: string
	text: string
	place_name: string
	center: Center
	place_type: [FeatureType]
}

export type Color =
	| "red"
	| "orange"
	| "olive"
	| "green"
	| "teal"
	| "violet"
	| "grey"
	| "brown"
	| "yellow"
	| "blue"
	| "purple"
	| "pink"
	| "black"
	| undefined
