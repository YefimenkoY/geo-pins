import React from "react"
import { Loader, Container, Table, Label, Header } from "semantic-ui-react"
import { Link } from "react-router-dom"

import usePin from "components/Pin/usePin"
import { GET_PINS_QUERY_GetPins } from "types/GET_PINS_QUERY"
import { featureColors } from "../../constants/common"
import { Color, FeatureType, Center } from "types/map"
import { routes } from "constants/routes"
import { useMapContext } from "context/map"

export default function AllPinsPage(): React.ReactElement {
	const { loading, error, data } = usePin()
	const { setCurrentPin } = useMapContext()

	if (loading) return <Loader active />

	if (error || !data) return <h3>Error</h3>

	return (
		<Container>
			<Header as="h1">All saved pins</Header>
			<Table celled striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>id</Table.HeaderCell>
						<Table.HeaderCell>name</Table.HeaderCell>
						<Table.HeaderCell>desc</Table.HeaderCell>
						<Table.HeaderCell>lon</Table.HeaderCell>
						<Table.HeaderCell>lat</Table.HeaderCell>
						<Table.HeaderCell>type</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{data.GetPins.map(
						({
							id,
							text,
							placeName,
							placeType,
							center,
						}: GET_PINS_QUERY_GetPins) => (
							<Table.Row>
								<Table.Cell
									onClick={() =>
										setCurrentPin({
											id,
											text,
											place_name: placeName,
											center: center as Center,
											place_type: [placeType as FeatureType],
										})
									}
									collapsing
								>
									<Link to={routes.ROOT}>{id}</Link>
								</Table.Cell>
								<Table.Cell collapsing>{text}</Table.Cell>
								<Table.Cell collapsing>{placeName}</Table.Cell>
								<Table.Cell collapsing>{center[0]}</Table.Cell>
								<Table.Cell collapsing>{center[1]}</Table.Cell>
								<Table.Cell collapsing>
									<Label
										color={featureColors[placeType as FeatureType] as Color}
										horizontal
									>
										{placeType}
									</Label>
								</Table.Cell>
							</Table.Row>
						),
					)}
				</Table.Body>
			</Table>
		</Container>
	)
}
