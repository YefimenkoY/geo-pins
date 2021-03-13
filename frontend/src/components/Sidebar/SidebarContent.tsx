import React from "react"
import {
	Segment,
	Dropdown,
	Input,
	List,
	Label,
	Button,
} from "semantic-ui-react"
import { debounce } from "lodash"
import styled, { css } from "styled-components"
import { useLocation } from "react-router-dom"

import { useMapContext } from "context/map"
import { useLayoutContext } from "context/layout"
import { getFeatures } from "../../api/map"
import { FeatureType, Color, Feature } from "types/map"
import { featureColors } from "../../constants/common"
import useWindowSize from "hooks/useWindowSize"
import { GET_PINS_QUERY_GetPins } from "types/GET_PINS_QUERY"

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
	width: 100%;

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

const SidebarContent = (): React.ReactElement => {
	const { setSidebarOpen } = useLayoutContext()

	const [feature, setFeature] = React.useState("")
	const [loading, setLoading] = React.useState(false)
	const [featureType, setFeatureType] = React.useState<FeatureType | "">("")
	const { width } = useWindowSize()
	const { pathname } = useLocation()

	React.useEffect(() => {
		if (pathname !== "/") {
			return setSidebarOpen(false)
		}
	}, [pathname])

	const {
		features,
		setFeatures,
		setMapPosition,
		setCurrentPin,
		currentPin,
		pins,
	} = useMapContext()

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
				size="mini"
				onChange={e => setFeature(e.target.value)}
				action={
					<Dropdown
						button
						basic
						loading={loading}
						floating
						placeholder="all"
						onChange={(e, { value }) => setFeatureType(value as FeatureType)}
						options={options}
						defaultSelectedLabel="all"
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
					const isCurrent = pins.some(
						({ pinId }: GET_PINS_QUERY_GetPins) => pinId === id,
					)

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
							<Content
								active={currentPin !== undefined && currentPin.id === id}
							>
								<List.Header as="h5">
									{isCurrent && <Label icon="save" horizontal color="green" />}
									<Label color={featureColors[d] as Color} horizontal>
										{d}
									</Label>
									{text}
								</List.Header>
								{width >= 768 && (
									<List.Description as="span">{place_name}</List.Description>
								)}
							</Content>
						</List.Item>
					)
				})}
			</List>
			<Button
				onClick={() => setSidebarOpen(false)}
				circular
				icon="angle right"
				color="red"
			/>
		</Segment>
	)
}

export default SidebarContent
