import React from "react"
import { Container, Message } from "semantic-ui-react"

export default (): React.ReactElement => (
	<Container>
		<Message>
			<Message.Header>404</Message.Header>
			<p>Page not found.</p>
		</Message>
	</Container>
)
