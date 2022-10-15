export const ThrottleFactory = (foo: () => void) => {
	let isThrottled = false
	return () => {
		if (isThrottled) { return }
		isThrottled = true
		setTimeout(() => {
			foo()
			isThrottled = false
		}, 50)
	}
}
