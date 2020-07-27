import { gql } from "@apollo/client"

import { pinFragment } from "../Pin/queries"

export const GET_PINS_QUERY = gql`
	query GET_PINS_QUERY {
		GetPins {
			id
			...pin
		}
	}
	${pinFragment}
`
