import { GET_PINS_QUERY as GET_PINS_QUERY_TYPE } from "types/GET_PINS_QUERY"
import { OperationVariables, QueryResult, useQuery } from "@apollo/client"

import { useMapContext } from "context/map"
import { GET_PINS_QUERY } from "components/Pin/queries"

export default (): QueryResult<GET_PINS_QUERY_TYPE, OperationVariables> => {
	const { setPins } = useMapContext()
	const { data, ...meta } = useQuery<GET_PINS_QUERY_TYPE>(GET_PINS_QUERY)

	if (!meta.loading && !meta.error && data && data.GetPins) {
		setPins(data.GetPins)
	}

	return {
		data,
		...meta,
	}
}
