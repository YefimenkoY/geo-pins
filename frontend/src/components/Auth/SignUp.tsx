import React, { useState, SyntheticEvent } from "react"
import { Grid, Header, Form, Segment, Button, Message } from "semantic-ui-react"
import {
	ApolloQueryResult,
	OperationVariables,
	useMutation,
} from "@apollo/client"
import { Link, useHistory } from "react-router-dom"

import { SIGN_UP_MUTATION } from "./queries"
import { routes } from "../../constants/routes"
import { SIGN_UP_MUTATION as SIGN_UP_MUTATION_TYPE } from "../../types/SIGN_UP_MUTATION"
import { GET_CURRENT_USER_QUERY as CurrentUser } from "types/GET_CURRENT_USER_QUERY"
import { Maybe } from "types/common"

type Props = {
	fetchCurrentUser: (
		variables?: Maybe<Partial<OperationVariables>>,
	) => Promise<ApolloQueryResult<CurrentUser>>
}

export default ({ fetchCurrentUser }: Props): React.ReactElement => {
	const history = useHistory()
	const [login, setLogin] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPasword] = useState("")
	const [signUp, { loading, error, data }] = useMutation(SIGN_UP_MUTATION, {
		async onCompleted(data: SIGN_UP_MUTATION_TYPE) {
			if (data && data.SignUp.token) {
				localStorage.setItem("token", data.SignUp.token)
				await fetchCurrentUser()
				history.push(routes.ROOT)
			}
		},
	})

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault()
		signUp({ variables: { input: { login, password, email } } })
	}
	const handleOnChange = (e: SyntheticEvent) => {
		const { name, value } = e.target as HTMLInputElement
		switch (name) {
			case "login":
				return setLogin(value)
			case "password":
				return setPasword(value)
			case "email":
				return setEmail(value)
		}
	}

	return (
		<Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
			<Grid.Column style={{ maxWidth: 450 }}>
				<Form onSubmit={handleSubmit} size="large">
					<Header as="h2" color="blue" textAlign="center">
						Sign-up form
					</Header>
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
						<Form.Input
							fluid
							error={error}
							name="email"
							onChange={handleOnChange}
							icon="mail"
							iconPosition="left"
							placeholder="Email"
							type="email"
							value={email}
						/>
						<Button
							loading={loading}
							color="blue"
							disabled={
								loading || !password.length || !login.length || !email.length
							}
							fluid
							size="large"
							content="Sign-up"
						/>
					</Segment>
				</Form>
				{error && (
					<Message error header="Error occurred" content={error.toString()} />
				)}
				{!error && data && (
					<Message positive>
						<Message.Header>Success</Message.Header>
						<p>
							You can <Link to={routes.LOG_IN}>login</Link> now.
						</p>
					</Message>
				)}
			</Grid.Column>
		</Grid>
	)
}
