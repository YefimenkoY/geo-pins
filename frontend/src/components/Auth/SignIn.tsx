import React, { useState, SyntheticEvent } from "react"
import {
	Container,
	Grid,
	Header,
	Form,
	Segment,
	Button,
	Message,
} from "semantic-ui-react"
import styled from "styled-components"
import { useMutation } from "@apollo/react-hooks"
import { withRouter, RouteComponentProps } from "react-router-dom"

import { routes } from "../../constants/routes"
import { SIGN_IN_MUTATION } from "./queries"

// const Grid: StyledComponent<any, any> = styled(_Grid)`
//   && {
//     height: 100%;
//   }
// `;

const FormBox = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	form {
		width: 400px;
	}
`

interface Props extends RouteComponentProps {
	refetch: any;
}

const SignIn: React.FC<Props> = ({ history, refetch }) => {
	const [logIn, { loading, error }] = useMutation(SIGN_IN_MUTATION, {
		onCompleted(data) {
			if (data) {
				refetch()
				localStorage.setItem("token", data.SignIn.token)
				return history.push(routes.ROOT)
			}
			refetch()
		},
		onError(e) {
			localStorage.setItem("token", "")
			refetch()
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
		<Container>
			<Grid text-align="center">
				<Grid.Row>
					<Grid.Column>
						<FormBox>
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
										size="large"
										content="Login"
									/>
								</Segment>
							</Form>
						</FormBox>
						{error && (
							<Message
								error
								header="Error occurred"
								content={error.toString()}
							/>
						)}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Container>
	)
}

export default withRouter(SignIn)
