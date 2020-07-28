import { gql } from "@apollo/client"

export const pinFragment = gql`
	fragment pin on Pin {
		id
		description
		title
		lat
		lon
		image
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
			id
			title
			createdAt
			description
			image
			lat
			lon
			author {
				id
				login
			}
		}
	}
`
