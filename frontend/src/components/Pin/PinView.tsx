import React from "react"
import { Card, Button } from "semantic-ui-react"
import { useMutation } from "@apollo/client"
import { Link } from "react-router-dom"

import mapContext from "context/map"
import { DELETE_PIN, CREATE_PIN } from "./queries"
import { GET_PINS_QUERY_GetPins } from "types/GET_PINS_QUERY"
import usePin from "components/Pin/usePin"

export default () => {
	const { currentPin, setCurrentPin, setPins, pins } = mapContext()
	const { refetch } = usePin()
	const [deletePin, { loading }] = useMutation(DELETE_PIN, {
		onCompleted(data) {
			refetch && refetch()
			setCurrentPin(null)
			setPins(data.DeletePin)
		},
	})
	const [createPin, { loading: loadingCreate }] = useMutation(CREATE_PIN, {
		onCompleted() {
			refetch()
		},
	})

	if (!currentPin) return null
	const {
		id,
		text,
		place_type: [placeType],
		place_name,
		center,
	} = currentPin
	const isCurrent = pins.some(
		({ pinId }: GET_PINS_QUERY_GetPins) => pinId === id,
	)

	const onSave = () => {
		createPin({
			variables: {
				input: {
					pinId: id,
					text,
					placeName: place_name,
					center,
					placeType,
				},
			},
		})
	}

	const onDelete = () => deletePin({ variables: { input: { pinId: id } } })

	return (
		<Card>
			<Card.Content>
				<Card.Header>{text}</Card.Header>
				<Card.Description>{placeType}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button
					circular
					loading={loadingCreate}
					icon="save"
					disabled={isCurrent}
					color="green"
					onClick={onSave}
				/>
				<Button
					circular
					as={Link}
					to={`/pin/${id}`}
					disabled={!isCurrent}
					icon="external alternate"
					color="green"
				/>
				<Button
					circular
					icon="trash"
					loading={loading}
					color="red"
					disabled={!isCurrent}
					onClick={onDelete}
				/>
			</Card.Content>
		</Card>
	)
}
