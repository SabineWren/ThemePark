import { html, LitElement} from "lit"
import { customElement, property } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"
import { GetThemeCss } from "Providers/Theme.js"

@customElement("theme-exporter")
class _ele extends LitElement {
	@property({ reflect: true }) variant: keyof ThemeColours
	static override get styles() { return [Shared] }
	override render() {
		return html`
<sl-button-group>
	<sl-dropdown placement="bottom-end">
		<sl-button variant="default" slot="trigger" size="medium"
			>Export Theme
			<sl-icon slot="suffix" name="triangle" library="custom"></sl-icon>
		</sl-button>
		<sl-menu>
			<sl-menu-item
				@click=${() => download(GetThemeCss(), "shoelace-theme.css")}
				>Export Shoelace Theme Tokens
			</sl-menu-item>
			<sl-menu-item>
				<a href="/shoelace-tokens.css" download
					style="color: inherit; text-decoration: inherit;"
					>Export Shoelace Shared CSS
				</a>
			</sl-menu-item>
		</sl-menu>
	</sl-dropdown>
</sl-button-group>`
	}
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
