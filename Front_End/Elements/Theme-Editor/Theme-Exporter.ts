import { css, html, LitElement} from "lit"
import { customElement, property } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"
import { ThemeProvider } from "Providers/Theme.js"
import { ThemeToCss } from "Themes/Platform_Targets/Shoelace.js"

@customElement("theme-exporter")
class _ele extends LitElement {
	@property({ reflect: true }) variant: keyof ThemeColours
	private themeProvider = new ThemeProvider(this)
	static override get styles() { return [Shared, css`
a { color: inherit; text-decoration: inherit; }
	`] }
	override render() {
		const theme = this.themeProvider.GetTheme()
		return html`
<sl-button-group>
	<sl-button variant="default" size="medium">Save Theme</sl-button>
	<sl-dropdown placement="bottom-end">
		<sl-button slot="trigger" size="medium" caret></sl-button>
		<sl-menu>
			<sl-menu-item
				@click=${() => exportSlTokens(theme)}
				>Export Shoelace Theme Tokens
			</sl-menu-item>
			<sl-menu-item>
				<a href="/shoelace-tokens.css" download>Export Shoelace Shared CSS</a>
			</sl-menu-item>
		</sl-menu>
	</sl-dropdown>
</sl-button-group>`
	}
}

const exportSlTokens = (spec: ThemeSpecification) => {
	const payload = ThemeToCss(spec).cssText
	download(payload, "shoelace-theme.css")
}

const download = (payload: string, filename: string) => {
	const blob = new Blob([payload], { type: "text/css" })
	const url = URL.createObjectURL(blob)

	const a = document.createElement("a")
	a.href = url
	a.download = filename
	document.body.appendChild(a)
	a.click()
	a.remove()

	URL.revokeObjectURL(url)
}
