import React from "react"
import { debounce } from "lodash"

interface ScreenRect {
	height: number
	width: number
}

function getSize(): ScreenRect {
	return {
		height: window.innerHeight,
		width: window.innerWidth,
	}
}

export default function useWindowSize(ratio = 250): ScreenRect {
	const [windowSize, setWindowSize] = React.useState<ScreenRect>(getSize())

	React.useEffect(() => {
		const handleResize = () => setWindowSize(getSize())
		window.addEventListener("resize", debounce(handleResize, ratio))

		return () => window.removeEventListener("resize", handleResize)
	}, [])

	return windowSize
}
