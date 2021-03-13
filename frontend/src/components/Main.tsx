import React from "react"

import { Map } from "./Map"
import usePin from "components/Pin/usePin"

const Main = (): React.ReactElement => {
	usePin()
	return <Map />
}

export default Main
