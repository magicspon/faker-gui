const { backgroundSize, backgroundColors } = require('./settings/backgrounds')
const {
	borderColors,
	borderRadius,
	borderWidths
} = require('./settings/borders')
const { colors } = require('./settings/colors')
const { zIndex } = require('./settings/layout')
const { opacity, shadows, svgFill, svgStroke } = require('./settings/misc')
const { plugins } = require('./settings/plugins')
const { screens } = require('./settings/screens')
const {
	width,
	minWidth,
	maxWidth,
	height,
	minHeight,
	maxHeight
} = require('./settings/sizing')
const { margin, negativeMargin, padding } = require('./settings/spacing')
const {
	fonts,
	fontWeights,
	leading,
	tracking,
	textColors,
	textSizes
} = require('./settings/typography')

module.exports = {
	backgroundSize,
	backgroundColors,

	borderColors,
	borderRadius,
	borderWidths,

	colors,

	zIndex,

	opacity,
	shadows,
	svgFill,
	svgStroke,

	screens,

	width,
	minWidth,
	maxWidth,
	height,
	minHeight,
	maxHeight,

	margin,
	negativeMargin,
	padding,

	fonts,
	fontWeights,
	leading,
	tracking,
	textColors,
	textSizes,

	plugins,
	modules: {
		appearance: [],
		backgroundAttachment: [],
		backgroundColors: ['hover', 'focus', 'responsive'],
		backgroundPosition: [],
		backgroundRepeat: [],
		backgroundSize: [],
		borderColors: ['responsive', 'hover', 'focus'],
		borderRadius: ['responsive'],
		borderStyle: ['responsive'],
		borderWidths: ['responsive', 'hover', 'focus'],
		cursor: [],
		display: ['responsive'],
		flexbox: ['responsive'],
		float: [],
		fonts: [],
		fontWeights: [],
		height: ['responsive'],
		leading: ['responsive'],
		lists: [],
		margin: ['responsive'],
		maxHeight: ['responsive'],
		maxWidth: ['responsive'],
		minHeight: ['responsive'],
		minWidth: ['responsive'],
		negativeMargin: ['responsive'],
		opacity: ['responsive', 'hover', 'focus', 'group-hover'],
		overflow: ['responsive'],
		padding: ['responsive'],
		pointerEvents: [],
		position: ['responsive'],
		resize: [],
		shadows: ['focus', 'hover'],
		svgFill: [],
		svgStroke: [],
		textAlign: ['responsive'],
		textColors: ['hover', 'focus', 'responsive', 'group-hover'],
		textSizes: ['responsive'],
		textStyle: [],
		tracking: [],
		userSelect: [],
		verticalAlign: [],
		visibility: ['responsive'],
		whitespace: ['responsive'],
		width: ['responsive'],
		zIndex: ['responsive']
	},

	/*
  |-----------------------------------------------------------------------------
  | Advanced Options         https://tailwindcss.com/docs/configuration#options
  |-----------------------------------------------------------------------------
  |
  | Here is where you can tweak advanced configuration options. We recommend
  | leaving these options alone unless you absolutely need to change them.
  |
  */

	options: {
		prefix: '',
		important: false,
		separator: ':'
	}
}
