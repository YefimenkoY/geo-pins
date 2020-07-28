import React from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_PIN } from "./queries"
import FullScreenLoader from "../FullScreenLoader"
import { Header, Item } from "semantic-ui-react"
import { GET_PINS_QUERY_GetPins } from "../../types/GET_PINS_QUERY"
import { intervalDuration } from "../../helpers/date"

const Box = styled.div`
	min-height: 100vh;
`

const Container = styled.div`
	width: 70vw;
	margin: 0 auto;
`

const InnerBox = styled.div`
	padding: 10px 0;
`

export default function () {
	const { id } = useParams()
	const { data, error, loading } = useQuery(GET_PIN, {
		variables: { input: { id } },
	})

	if (loading) return <FullScreenLoader />
	if (!data || !data.GetPin || error) return <Header as="h1">Not found</Header>

	const {
		image,
		description,
		title,
		createdAt,
	} = data.GetPin as GET_PINS_QUERY_GetPins

	return (
		<Box>
			<Container>
				<InnerBox>
					<Item.Group>
						<Item>
							<Item.Image size="medium" src={image} />
							<Item.Content>
								<Item.Header>{title}</Item.Header>
								<Item.Meta>
									<span className="price">
										Created {intervalDuration(+createdAt)}
									</span>
								</Item.Meta>
								<h4>Description:</h4>
								<Item.Description>{description}</Item.Description>
							</Item.Content>
						</Item>
					</Item.Group>
				</InnerBox>
			</Container>
		</Box>
	)
}
