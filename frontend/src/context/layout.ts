import { useState } from "react"
import createUseContext from "constate"

export default createUseContext(() => {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
	const [headerHeight, setHeaderHeight] = useState<number>(0)

	return {
		sidebarOpen,
		setSidebarOpen,
		headerHeight,
		setHeaderHeight,
	}
})
