export type Theme = {
	header: {
		height: string
	}
	colors: {
		purple: string
	}
	sizes: {
		sm: number
	}
}

const theme: Theme = {
	header: {
		height: "100px",
	},
	colors: {
		purple: "#a333c8",
	},
	sizes: {
		sm: 768,
	},
}

export default theme
