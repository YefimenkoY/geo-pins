import React from "react"
import { Segment, Dropdown, Input, List, Label } from "semantic-ui-react"
import { debounce } from "lodash"
import styled, { css, StyledFunction } from "styled-components"

import mapContext from "context/map"
import { getFeatures } from "../../api/map"
import { FeatureType, Color, Feature } from "types/map"
import { featureColors } from "../../constants/common"

const options = Object.keys(FeatureType)
	.map(f => ({
		key: f,
		text: f,
		value: f,
	}))
	.concat({ key: "all", text: "all", value: "" })

const Content = styled(List.Content)`
	display: flex;
	flex-direction: column;
	cursor: pointer;

	.header,
	.description {
		width: fit-content;
		text-align: left;
	}

	${({ active }) =>
		active &&
		css`
			background: #d9e778;
		`}
`

const SidebarContent = () => {
	const [feature, setFeature] = React.useState("")
	const [loading, setLoading] = React.useState(false)
	const [featureType, setFeatureType] = React.useState<FeatureType | "">("")
	const {
		features,
		setFeatures,
		setMapPosition,
		setCurrentPin,
		currentPin,
	} = mapContext()

	React.useEffect(() => {
		const search = debounce(async function () {
			setLoading(true)
			const { data } = await getFeatures({ feature, types: featureType })
			setLoading(false)
			if (data) setFeatures(data.features)
		}, 450)
		feature.length > 3 && search()
	}, [feature, featureType])

	return (
		<Segment>
			<Input
				value={feature}
				loading={loading}
				onChange={e => setFeature(e.target.value)}
				action={
					<Dropdown
						button
						basic
						loading={loading}
						floating
						placeholder="location type"
						onChange={(e, { value }) => setFeatureType(value as FeatureType)}
						options={options}
					/>
				}
				icon="search"
				iconPosition="left"
				placeholder="Search..."
			/>
			<List divided relaxed>
				{features.map((f: Feature) => {
					const {
						id,
						text,
						place_name,
						place_type: [d],
						center: [lon, lat],
					} = f
					return (
						<List.Item
							key={id}
							onClick={() => {
								setMapPosition({
									longitude: lon,
									latitude: lat,
									zoom: 12,
								})
								setCurrentPin(f)
							}}
						>
							<Content active={currentPin !== null && currentPin.id === id}>
								<List.Header as="h3">
									{" "}
									<Label color={featureColors[d] as Color} horizontal>
										{d}
									</Label>
									{text}
								</List.Header>
								<List.Description as="p">{place_name}</List.Description>
							</Content>
						</List.Item>
					)
				})}
			</List>
		</Segment>
	)
}

export default SidebarContent
