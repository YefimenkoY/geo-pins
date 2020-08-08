const path = require("path")
const { addWebpackAlias } = require("customize-cra")

module.exports = function override(config, env) {
	config = addWebpackAlias({
		["types"]: path.resolve(__dirname, "src", "types"),
		["hooks"]: path.resolve(__dirname, "src/hooks"),
		["context"]: path.resolve(__dirname, "src", "context"),
		["components"]: path.resolve(__dirname, "src/components"),
	})(config)

	return config
}
