import { gql } from "@apollo/client"

export const GET_CURRENT_USER_QUERY = gql`
	query GET_CURRENT_USER_QUERY {
		CurrentUser {
			id
			login
			email
		}
	}
`

export const SIGN_IN_MUTATION = gql`
	mutation SIGN_IN_MUTATION($input: SignInUser!) {
		SignIn(input: $input) {
			token
		}
	}
`

export const SIGN_UP_MUTATION = gql`
	mutation SIGN_UP_MUTATION($input: SignUpUser!) {
		SignUp(input: $input) {
			token
		}
	}
`
