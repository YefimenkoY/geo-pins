import { gql } from "@apollo/client"

export const pinFragment = gql`
	fragment pin on Pin {
		id
		pinId
		text
		placeName
		placeType
		center
		createdAt
		comments {
			text
		}
		author {
			id
			login
			email
		}
	}
`

export const DELETE_PIN = gql`
	mutation DELETE_PIN($input: DeletePinInput!) {
		DeletePin(input: $input) {
			...pin
		}
	}
	${pinFragment}
`

export const GET_PIN = gql`
	query GET_PIN($input: GetPinInput!) {
		GetPin(input: $input) {
			...pin
		}
	}
	${pinFragment}
`

export const GET_PINS_QUERY = gql`
	query GET_PINS_QUERY {
		GetPins {
			...pin
		}
	}
	${pinFragment}
`

export const CREATE_PIN = gql`
	mutation CREATE_PIN($input: CreatePinInput!) {
		CreatePin(input: $input) {
			...pin
		}
	}
	${pinFragment}
`
