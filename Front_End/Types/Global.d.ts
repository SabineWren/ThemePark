interface HTMLElement {
	shadowRoot: ShadowRoot
}
interface Node {
	getRootNode(options?: GetRootNodeOptions): ShadowRoot
}

// All global functions defined in Main.ts
declare function $<T extends HTMLElement>(ele: ParentNode | HTMLElement, selector: string): T
declare function $$<T extends HTMLElement>(ele: ParentNode | HTMLElement, selector: string): T[]
