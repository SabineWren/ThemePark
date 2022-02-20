export const ThrottleFactory = (foo: () => any) => {
	let isThrottled = false
	const fire = () => { foo(); isThrottled = false }
	return () => {
		if (isThrottled) { return }
		isThrottled = true
		setTimeout(fire, 50)
	}
}
