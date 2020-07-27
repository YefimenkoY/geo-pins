import React from "react"
import { Card, Image, Button } from "semantic-ui-react"
import { useMutation } from "@apollo/client"

import mapContext from "../../context/map"
import { DELETE_PIN } from "./queries"
import { intervalDuration } from "../../helpers/date"

export default () => {
	const { currentPin, setCurrentPin, setPins } = mapContext()
	const [deletePin, { loading }] = useMutation(DELETE_PIN, {
		onCompleted(data) {
			setCurrentPin(null)
			setPins(data.DeletePin)
		},
	})
	if (!currentPin) return null
	const { image, description, title, createdAt } = currentPin

	const date = intervalDuration(+createdAt)
	const onDelete = () =>
		deletePin({ variables: { input: { pinId: currentPin.id } } })

	return (
		<Card>
			<Card.Content>
				<Card.Header>{title}</Card.Header>
				<Card.Description>{description}</Card.Description>
				<Card.Meta>
					<span className="date">{`Created ${date}`}</span>
				</Card.Meta>
			</Card.Content>
			<Card.Content extra>
				<Button
					circular
					icon="trash"
					loading={loading}
					color="red"
					onClick={onDelete}
				/>
			</Card.Content>
		</Card>
	)
}
