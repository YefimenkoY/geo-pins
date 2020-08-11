import React from "react"
import { useQuery } from "@apollo/client"

import mapContext from "context/map"
import { GET_PINS_QUERY } from "components/Pin/queries"

export default () => {
	const { setPins } = mapContext()
	const { data, ...meta } = useQuery(GET_PINS_QUERY)

	if (!meta.loading && !meta.error && data) {
		setPins(data.GetPins)
	}
console.log(meta)
	return {
		data,
		...meta,
	}
}
