module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: { "sourceType": "module" },
	plugins: ["@typescript-eslint", "import"],
	env: {
		"browser": true,
		"es2021": true,
		"worker": true },
	// See all pre-defined configs: https://www.npmjs.com/package/eslint-config-defaults
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
	],
	rules: {
		// https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/indent": ["warn", "tab", {
			"ignoreComments": true,
			"ignoredNodes": ["TemplateLiteral *"],// the ${} contents of `template literals`
			"flatTernaryExpressions": true,
			"FunctionExpression": { "body": 1, "parameters": 1 },
			"offsetTernaryExpressions": false,
		}],
		"@typescript-eslint/no-confusing-non-null-assertion": "error",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-extra-non-null-assertion": "error",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-unused-vars": ["warn", {
			"argsIgnorePattern": "^_",
			"varsIgnorePattern": "^_",
		}],
		"@typescript-eslint/space-before-function-paren": ["warn", {
			"anonymous": "always",
			"asyncArrow": "always",
			"named": "never",
		}],
		"arrow-spacing": ["warn", { "before": true, "after": true }],
		"comma-dangle": [ "warn", "always-multiline" ],
		"eqeqeq": "error",
		"func-style": ["error", "expression"],
		"import/extensions": ["warn", { "js": "always" }],
		// https://eslint.org/docs/rules/indent
		"indent": "off",// @typescript-eslint
		"keyword-spacing": ["warn"],
		"MemberExpression": "off",
		"no-case-declarations": "off",
		"no-console": [ "error", { "allow": [ "warn", "error" ] }],
		"no-debugger": "warn",
		"no-extra-semi": "warn",
		"no-extra-parens": "off",
		"no-irregular-whitespace": "warn",
		"no-mixed-spaces-and-tabs": [ "error", "smart-tabs" ],
		"no-restricted-globals": ["error",
			{ "name": "name", "message": "You probably don't mean window.name. Undeclared variable?" },
		],
		"no-undef": "off",// override recommended so ts can check .d.ts
		"no-unexpected-multiline": "off",
		"no-unused-vars": ["off"],// @typescript-eslint
		"prefer-arrow-callback": "warn",
		"semi": [ "error", "never" ],
		"semi-spacing": "warn",
		"space-before-blocks": ["warn", "always"],
		"space-before-function-paren": "off",// @typescript-eslint
		"spaced-comment": "warn",
		"wrap-iife": ["warn", "inside"],
	},
}
