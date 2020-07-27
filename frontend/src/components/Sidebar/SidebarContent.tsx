import React from "react"
import { Segment, Form, Button, Icon, Header } from "semantic-ui-react"
import axios from "axios"
import { useMutation } from "@apollo/client"

import mapContext from "../../context/map"
import { CREQTE_PIN_MUTATION } from "./queries"

const SidebarContent = () => {
	const { setCurrentPosition, currentPosition, setPins } = mapContext()
	const fileRef = React.createRef<HTMLInputElement>()
	const [image, setImage] = React.useState<File | null>(null)
	const [title, setTitle] = React.useState("")
	const [description, setDescription] = React.useState("")
	function cleanData() {
		setImage(null)
		setTitle("")
		setDescription("")
		setCurrentPosition(null)
	}
	const [createPin, { loading }] = useMutation(CREQTE_PIN_MUTATION, {
		onCompleted(data) {
			setPins(prevPins => [...prevPins, data.CreatePin])
			cleanData()
		},
	})
	const handleImageUpload = async () => {
		if (image === null) return
		const data = new FormData()
		data.append("file", image)
		data.append("upload_preset", "geopins")
		data.append("cloud_name", "dxdjcnhap")

		try {
			const { data: image } = await axios.post(
				"https://api.cloudinary.com/v1_1/dxdjcnhap/image/upload",
				data,
			)
			return image.url
		} catch (e) {
			console.warn(`failed to upload image: ${e}`)
			setImage(null)
		}
	}

	const handleSubmit = async () => {
		const uploadedImage = await handleImageUpload()

		uploadedImage &&
			currentPosition &&
			createPin({
				variables: {
					input: {
						title,
						image: uploadedImage,
						description,
						lat: String(currentPosition.latitude),
						lon: String(currentPosition.longitude),
					},
				},
			})
	}

	return (
		<Segment inverted color="grey">
			<Header as="h3" textAlign="center">
				Create your pin!
				<Icon color="red" name="map pin" />
			</Header>
			<Form onSubmit={handleSubmit} inverted>
				<Form.Group widths="equal">
					<Form.Input
						onChange={e => setTitle(e.target.value)}
						value={title}
						fluid
						label="Title"
						placeholder="Title"
					/>
				</Form.Group>
				<Form.Group widths="equal">
					<Form.TextArea
						value={description}
						onInput={(e: any) => setDescription(e.target.value)}
						label="Description"
						placeholder="Descriptionle"
					/>
				</Form.Group>
				<Form.Group widths="equal">
					<Button
						content="Choose image"
						labelPosition="left"
						icon={!image ? "image" : "check"}
						color={!image ? "red" : "green"}
						onClick={() => fileRef.current && fileRef.current.click()}
					/>
					<input
						ref={fileRef}
						type="file"
						hidden
						onChange={e => e.target.files && setImage(e.target.files[0])}
					/>
				</Form.Group>
				<Button disabled={!image} loading={loading} color="green" type="submit">
					<Icon name="send" />
					Submit
				</Button>
				<Button onClick={() => setCurrentPosition(null)} color="red">
					<Icon color="teal" name="trash alternate" />
					Cencel
				</Button>
			</Form>
		</Segment>
	)
}

export default SidebarContent
