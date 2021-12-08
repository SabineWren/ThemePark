import { css, html, LitElement} from "lit"
import { customElement } from "lit/decorators.js"
import { createRef, Ref, ref } from "lit/directives/ref.js"
import { Shared } from "Elements/Style.js"
import { TokensFromHsl } from "Themes/Tools/ShoelaceTokenGenerator.js"

const style = css`
:host {
	--spacing: 1.5rem;
	--swatch-size: 62px;
}
h1 {
	font-size: 1.5rem;
	font-weight: 300;
	text-align: center;
	margin: 0 0 var(--spacing) 0;
}
sl-card {
	margin: 0 auto; }
sl-card::part(base) {
	--padding: var(--spacing);
	border: none;
	box-shadow: var(--sl-shadow-large);
}

#result {
	display: grid;
	grid-template-columns: repeat(11, var(--swatch-size));
	gap: 4px;
	margin-bottom: var(--spacing);
}

.swatch {
	display: inline-block;
	width: var(--swatch-size);
	height: var(--swatch-size);
	border-radius: 2px;
}
.inputs { display: flex; gap: var(--spacing); }

sl-color-picker {
	margin-bottom: var(--spacing); }
sl-color-picker::part(base) {
	box-shadow: none; }

.right { flex: 1 1 auto; }
sl-textarea::part(textarea) {
	font-family: var(--sl-font-mono);
	font-size: 14px;
	height: 350px;
}

a { color: inherit; }
a:hover {
	color: rgb(var(--sl-color-primary-600)); }

footer {
	text-align: center;
	margin-top: calc(var(--spacing) / 2);
}
small:not(:first-child):before { content: '·'; }
`

@customElement("token-generator")
export class TokenGenerator extends LitElement {
	private nameRef: Ref<SlInput> = createRef()
	private pickerRef: Ref<SlColorPicker> = createRef()
	override firstUpdated() { this.requestUpdate() }
	static override get styles() { return [Shared, style] }
	override render() {
		const picker = this.pickerRef.value
		const name = this.nameRef.value?.value
		const { Swatches, Tokens } = picker && name
			? TokensFromHsl(picker.value, name)
			: { Swatches: [], Tokens: [] }
		const text = `/* Copy & paste into your theme */\n\n${Tokens}`
		// format="hsl" value="hsl(212, 72%, 59%)"
		return html`
<sl-card>
	<div id="result">${Swatches}</div>

	<div class="inputs">
		<div class="left">
			<sl-color-picker inline
				${ref(this.pickerRef)}
				@sl-change=${() => this.requestUpdate()}
				format="hsl" value="hsl(199, 88%, 50%)"
			></sl-color-picker>
			<sl-input name="name"
				${ref(this.nameRef)}
				@sl-input=${() => this.requestUpdate()}
				placeholder="Colour Name (ex. primary)"
				value="primary" size="small">
					<sl-icon slot="suffix" name="palette"></sl-icon>
			</sl-input>
		</div>
		<div class="right">
			<sl-textarea name="tokens" readonly resize="none"
				value=${text}>
			</sl-textarea>
		</div>
	</div>
</sl-card>`
	}
}
