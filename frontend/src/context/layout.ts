import { useState } from "react"
import constate from "constate"

const [Provider, useLayoutContext] = constate(() => {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [headerHeight, setHeaderHeight] = useState(0)

	return {
		sidebarOpen,
		setSidebarOpen,
		headerHeight,
		setHeaderHeight,
	}
})

export { useLayoutContext, Provider }
