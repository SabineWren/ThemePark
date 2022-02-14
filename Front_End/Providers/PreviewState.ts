import { ReactiveController, ReactiveControllerHost } from "lit"

let hosts: ReactiveControllerHost[] = []
const state = {
	IsOutline: false,
}

export class PreviewState implements ReactiveController {
	constructor(private host: ReactiveControllerHost) { host.addController(this) }
	hostConnected() { hosts.push(this.host) }
	hostDisconnected() { hosts = hosts.filter(h => h !== this.host) }

	GetIsOutline() { return state.IsOutline }
	SetIsOutline(s: boolean) {
		state.IsOutline = s
		hosts.forEach(h => h.requestUpdate())
	}
}
