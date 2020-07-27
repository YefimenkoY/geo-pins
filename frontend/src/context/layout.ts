import { useState } from "react"
import createUseContext from "constate"

export default createUseContext(() => {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

	return {
		sidebarOpen,
		setSidebarOpen,
	}
})
