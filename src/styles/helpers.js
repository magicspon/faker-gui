import * as R from 'ramda'
import { ms2rem, px2rem, stripUnits } from './settings/tailwind.utils'
import { screens } from './settings/screens'
import { textSizes, fonts } from './settings/typography'

export const breakpoints = R.compose(
	R.reduce((acc, [key, value]) => {
		acc[key] = `@media (min-width: ${value})`

		return acc
	}, {}),
	Object.entries
)(screens)

/**
 * @function fluidtype
 *
 * @description Fluid type helper function, props come from the tailwind textSizes object.
 *
 * @param {String} prop
 * @param {Number} start - defaults to 320
 * @param {Number} stop - defaults to 1440
 *
 * @return {String}
 *
 * @example
 *
 * fluidtype('h2')
 *
 * calc(1.0670rem + 2 * (100vw - 0.1250em) / 87.375); @media (min-width: 90.0000em) { font-size: 3.0116rem;}
 */
export const fluidtype = (prop, start = 320, stop = 1400) => {
	const { min, max } = textSizes[prop]

	return `calc(${ms2rem(stripUnits(min))} + ${stripUnits(max) -
		stripUnits(min)} * (100vw - ${px2rem(start, 'em')}) / ${px2rem(stop, '') -
		px2rem(start, '')}); ${breakpoints.max} {
			font-size: ${max};
		}`
}

export const boldFont = fonts.bold.toString()

export const regularFont = fonts.regular.toString()
