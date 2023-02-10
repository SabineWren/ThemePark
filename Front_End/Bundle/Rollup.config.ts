import nodeResolve, { RollupNodeResolveOptions } from "@rollup/plugin-node-resolve"
import * as Process from "process"
import { PluginCleanOldFiles, RmDirSync } from "./Clean.js"
import { PluginInjectHashIntoHtml } from "./InjectHash.js"

const PATH = Object.freeze({
	Dist_Dir: "Web_Root/dist/",
	Root_Dir: "Web_Root/",
	Html_Template: "Front_End/index_template.html",
})
const FORMAT = "esm"// https://rollupjs.org/guide/en/#outputformat
const RESOLVE_OPTIONS: RollupNodeResolveOptions = Object.freeze({
	browser: true,
	extensions: [".js"],
	moduleDirectories: ["Front_End"],
	modulePaths: ["./", "node_modules"],
})

// The internal type declaration for config options is just { [key: string]: unknown; }
// https://github.com/rollup/rollup/blob/master/src/utils/options/options.ts
export default (async () => {
	RmDirSync(PATH.Dist_Dir)
	const isLocal = Process.argv.includes("--config-local")

	// Importing a plugin slows the build, even when it's not used.
	// Source: https://github.com/rollup/rollup/blob/master/docs/999-big-list-of-options.md#plugins
	// Disabled entirely due to lack of maintenance. Check back later.
	// https://github.com/TrySound/rollup-plugin-terser/pull/120
	// const pluginMinify = isLocal ? null : await import("rollup-plugin-terser")

	const main = {
		input: "Main.js",
		output: {
			dir: PATH.Dist_Dir,
			entryFileNames: "[name].[hash].js",
			format: FORMAT,
			sourcemap: isLocal,
		},
		plugins: [
			PluginCleanOldFiles(PATH.Dist_Dir, "Main"),
			nodeResolve(RESOLVE_OPTIONS),
			//...pluginMinify ? [pluginMinify.terser()] : [],
			PluginInjectHashIntoHtml(PATH.Html_Template, PATH.Root_Dir, ["Main"]),
		],
		// We always use a hash, so we don't get facades anyway
		preserveEntrySignatures: "strict",
		watch: { buildDelay: 20, clearScreen: false, exclude: "node_modules/**" },
	}
	return [main]
})
