import { css } from "lit"

export const Aurora = css`
:host {
	--au-green-light: hsl(138 63% 18%);
	--au-green-dark: hsl(139 49% 10% / 0%);
	--au-jade-light: hsl(169, 64%, 16%);

	--aurora1: url("/aurora/aurora-corners.svg");

	--aurora2:
		radial-gradient(11.5% 7.5% at 2% 32%
			,rgba(16, 19, 20, 0.7) 0%
			,rgba(42, 0, 102, 0) 99%)
		,radial-gradient(37.5% 28.5% at 0% 28%
			,#26005c 1%
			,rgba(26, 24, 52, 0) 100%)
		,radial-gradient(40% 17% at 24% 0%,
			#0d443a 0%,
			rgba(15, 54, 49, 0.67) 33.33%
			,rgba(11, 29, 29, 0) 100%)
		/* Top Right Green */
		,radial-gradient(ellipse 22% 45.5% at 96% 13%
			,var(--au-jade-light) 0%
			,rgba(11, 29, 29, 0) 100%
		)
		/*
		,radial-gradient(22% 45.5% at 96% 13%
			,var(--au-jade-light) 0%
			,rgba(11, 29, 29, 0) 100%)
		*/
		/* Top Left Inner */
		,radial-gradient(25% 15.5% at 66% 4%
			,rgba(38, 0, 92, 0.6) 0%
			,rgba(33, 0, 92, 0.45) 25%
			,rgba(26, 0, 91, 0.3) 50%
			,rgba(6, 0, 92, 0) 100%)
		/* Bottom Right */
		,radial-gradient(34.5% 24.5% at 95% 100%
			,var(--au-green-light) 0%
			,var(--au-green-dark) 100%)
		/* Bottom Left */
		,radial-gradient(38% 21% at 11% 100%
			,var(--au-green-light) 0%
			,var(--au-green-dark) 100%)
		/* background */
		,linear-gradient(90deg
			,#0f1415 0%
			,#0f1415 24.75%
			,#0f1415 49.5%
			,#0f1415 99%)
		;
}

`
