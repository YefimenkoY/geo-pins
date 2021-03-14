import React, { useState, SyntheticEvent } from "react"
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react"

import {
	ApolloQueryResult,
	OperationVariables,
	useMutation,
} from "@apollo/client"
import { useHistory } from "react-router-dom"

import { routes } from "../../constants/routes"
import { SIGN_IN_MUTATION } from "./queries"
import { SIGN_IN_MUTATION as SIGN_IN_MUTATION_TYPE } from "types/SIGN_IN_MUTATION"
import { GET_CURRENT_USER_QUERY as CurrentUser } from "types/GET_CURRENT_USER_QUERY"
import { Maybe } from "types/common"

type Props = {
	fetchCurrentUser: (
		variables?: Maybe<Partial<OperationVariables>>,
	) => Promise<ApolloQueryResult<CurrentUser>>
}

const SignIn: React.FC<Props> = ({ fetchCurrentUser }) => {
	const history = useHistory()
	const [logIn, { loading, error }] = useMutation(SIGN_IN_MUTATION, {
		async onCompleted(data: SIGN_IN_MUTATION_TYPE) {
			if (data && data.SignIn.token) {
				localStorage.setItem("token", data.SignIn.token)
				await fetchCurrentUser()
				history.push(routes.ROOT)
			}
		},
	})
	const [login, setLogin] = useState("")
	const [password, setPassword] = useState("")

	const handleOnChange = (e: SyntheticEvent) => {
		const { name, value } = e.target as HTMLInputElement
		if (name === "login") setLogin(value)
		if (name === "password") setPassword(value)
	}

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault()
		logIn({ variables: { input: { login, password } } })
	}

	return (
		<Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as="h2" color="teal" textAlign="center">
					Log-in to your account
				</Header>
				<Form onSubmit={handleSubmit} size="large">
					<Segment stacked>
						<Form.Input
							error={error}
							value={login}
							name="login"
							onChange={handleOnChange}
							fluid
							icon="user"
							iconPosition="left"
							placeholder="Login"
						/>
						<Form.Input
							fluid
							error={error}
							name="password"
							onChange={handleOnChange}
							icon="lock"
							iconPosition="left"
							placeholder="Password"
							type="password"
							value={password}
						/>
						<Button
							loading={loading}
							color="teal"
							disabled={loading || !password.length || !login.length}
							fluid
							type="submit"
							size="large"
							content="Login"
						/>
					</Segment>
				</Form>
				{error && (
					<Message error header="Error occurred" content={error.toString()} />
				)}
			</Grid.Column>
		</Grid>
	)
}

export default SignIn
