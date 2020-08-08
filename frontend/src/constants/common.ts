import { FeatureType } from "types/map"

export enum MapStyle {
	street = "streets-v11",
	light = "light-v10",
	dark = "dark-v10",
	outdors = "satellite-v9",
}

export const featureColors = {
	[FeatureType.country]: "red",
	[FeatureType.address]: "orange",
	[FeatureType.district]: "olive",
	[FeatureType.locality]: "green",
	[FeatureType.poi]: "teal",
	[FeatureType.region]: "violet",
	[FeatureType.neighborhood]: "grey",
	[FeatureType.place]: "brown",
}
