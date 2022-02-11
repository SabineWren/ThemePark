import { css, html, LitElement} from "lit"
import { customElement, property } from "lit/decorators.js"
import { createRef, Ref } from "lit/directives/ref.js"
import { Shared } from "Elements/Style.js"
import { ThemeProvider } from "Providers/Theme.js"
import { ThemeColoursToCss } from "Themes/Lib/DesignTokens.js"
import { TokenizeAll } from "Themes/Platform_Targets/Shoelace.js"

@customElement("theme-exporter")
class _themeExporter extends LitElement {
	@property({ reflect: true }) variant: keyof ThemeColours
	private pickerRef: Ref<SlColorPicker> = createRef()
	private themeProvider = new ThemeProvider(this)
	override firstUpdated() { this.requestUpdate() }
	static override get styles() { return [Shared, css`
a { color: inherit; text-decoration: inherit; }
	`] }
	override render() {
		const theme = this.themeProvider.GetTheme()
		return html`
<sl-button-group style="margin-top: 0.5em;">
	<sl-button variant="success" size="small" outline>Save Theme</sl-button>
	<sl-dropdown placement="bottom-end">
		<sl-button variant="success" slot="trigger" size="small" outline caret></sl-button>
		<sl-menu>
			<sl-menu-item
				@click=${() => ExportSlColours(theme.TokensColourTheme)}
				>Export Shoelace Colour Tokens
			</sl-menu-item>
			<sl-menu-item>
				<a href="/shoelace-tokens.css" download>Export Shoelace Shared CSS</a>
			</sl-menu-item>
		</sl-menu>
	</sl-dropdown>
</sl-button-group>`
	}
}

const ExportSlColours = (colours: ThemeColours) =>
	download(ThemeColoursToCss(TokenizeAll(colours)).cssText)

const download = (payload: string) => {
	const blob = new Blob([payload], { type: "text/css" })
	const url = URL.createObjectURL(blob)

	const a = document.createElement("a")
	a.href = url
	a.download = "shoelace-colours.css"
	document.body.appendChild(a)
	a.click()
	a.remove()

	URL.revokeObjectURL(url)
}
