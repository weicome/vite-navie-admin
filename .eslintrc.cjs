module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: ["eslint:recommended", "plugin:vue/vue3-essential", "plugin:@typescript-eslint/recommended"],
	overrides: [],
	parser: "vue-eslint-parser",
	parserOptions: {
		parser: "@typescript-eslint/parser",
		ecmaVersion: "latest",
		sourceType: "module",
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: ["vue", "@typescript-eslint"],
	rules: {
		"vue/multi-word-component-names": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"no-undef": "off",
		"@typescript-eslint/no-unused-vars": "off"
	}
}
