module.exports = {
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
	},
	extends: ["plugin:@typescript-eslint/recommended"],
	rules: {
		"@typescript-eslint/semi": 0,
	},
}
