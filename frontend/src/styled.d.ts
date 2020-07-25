import "styled-components"

declare module "styled-components" {
	export interface DefaultTheme {
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
}
