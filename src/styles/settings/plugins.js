const R = require('ramda')
const { numRange } = require('./tailwind.utils')
const mapIndexed = R.addIndex(R.map)

module.exports = {
	plugins: [
		require('tailwindcss-fluid')({
			textSizes: true
		}),

		// https://github.com/bradlc/tailwindcss-alpha
		require('tailwindcss-alpha')({
			modules: {
				backgroundColors: true,
				borderColors: true,
				textColors: true
			},
			alpha: (function nums(from, to) {
				return R.reduce((acc, curr) => {
					acc[`${curr * 10}`] = curr / 10

					return acc
				}, {})(numRange(from, to, value => value))
			})(0, 10)
		}),

		require('tailwindcss-visuallyhidden')(),

		// flex order
		function({ addUtilities }) {
			addUtilities(
				{
					'.order-1': {
						order: '1'
					},
					'.order-2': {
						order: '2'
					},
					'.order-3': {
						order: '3'
					},
					'.order-4': {
						order: '4'
					}
				},
				{
					variants: ['responsive']
				}
			)
		},

		// more pins
		function({ addUtilities }) {
			addUtilities(
				{
					'.pin-l-100': {
						left: '100%'
					},
					'.pin-r-100': {
						right: '100%'
					},
					'.pin-l--100': {
						left: '-100%'
					},
					'.pin-r--100': {
						right: '-100%'
					}
				},
				{
					variants: ['responsive']
				}
			)
		},

		// object fit
		function({ addUtilities }) {
			addUtilities(
				{
					'.object-cover': {
						'object-fit': 'cover'
					},
					'.object-fill': {
						'object-fit': 'fill'
					},
					'.object-none': {
						'object-fit': 'none'
					},
					'.object-scale-down': {
						'object-fit': 'scale-down'
					},
					'.object-contain': {
						'object-fit': 'contain'
					},
					'.object-fit-center': {
						'object-position': 'center center'
					},
					'.object-fit-right': {
						'object-position': 'right center'
					}
				},
				{
					variants: ['responsive']
				}
			)
		},

		// position fix perf fix
		function({ addUtilities }) {
			addUtilities(
				{
					'.perf-fixed': {
						position: 'fixed',
						transform: 'translateZ(0)'
					}
				},
				{
					variants: ['responsive']
				}
			)
		},

		// position fix perf fix
		function({ addUtilities }) {
			addUtilities(
				{
					'.greyscale': {
						filter: 'grayscale(1)'
					}
				},
				{
					variants: ['responsive']
				}
			)
		},

		// rotate
		function({ addUtilities }) {
			addUtilities(
				{
					'.rotate-90': {
						transform: 'rotate(90deg)'
					},
					'.rotate-180': {
						transform: 'rotate(180deg)'
					},
					'.rotate-270': {
						transform: 'rotate(270deg)'
					},
					'.scale-1-5': {
						transform: 'scale(1.5)'
					}
				},
				{
					variants: ['responsive']
				}
			)
		},

		// translate
		function({ addUtilities }) {
			addUtilities(
				{
					'.x-100': {
						transform: 'translate3d(100%, 0, 0)'
					},
					'.x--100': {
						transform: 'translate3d(-100%, 0, 0)'
					},
					'.x-0': {
						transform: 'translate3d(0, 0, 0)'
					},
					'.y-50': {
						transform: 'translate3d(0, 50%, 0)'
					},
					'.y-75': {
						transform: 'translate3d(0, 75%, 0)'
					},
					'.y-100': {
						transform: 'translate3d(0, 100%, 0)'
					},
					'.y--100': {
						transform: 'translate3d(0, -100%, 0)'
					},
					'.y-0': {
						transform: 'translate3d(0, 0, 0)'
					},
					'.absolute-center': {
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate3d(-50%, -50%, 0)'
					},
					'.vert-center': {
						top: '50%',
						transform: 'translateY(-50%)'
					}
				},
				{
					variants: ['responsive', 'hover', 'group-hover']
				}
			)
		},

		function({ addUtilities }) {
			addUtilities(
				{
					'.grid': {
						display: 'grid',
						'grid-template-columns': 'repeat(24, 1fr)',
						'grid-template-rows': 'auto',
						'grid-auto-flow': 'dense',
						'grid-column-gap': '1.875rem'
					},
					...R.compose(
						R.reduce((acc, { start, end }) => {
							acc[start.key] = {
								'grid-column-start': `${start.value}`
							}
							acc[end.key] = {
								'grid-column-end': `${end.value}`
							}
							return acc
						}, {}),
						mapIndexed((item, index) => {
							const position = index + 1
							const start = `.col-start-${position}`
							const end = `.col-end-${position}`

							return {
								start: {
									key: start,
									value: position
								},
								end: {
									key: end,
									value: position
								}
							}
						})
					)(Array.from({ length: 25 }))
				},
				{
					variants: ['responsive']
				}
			)
		},

		// transitions
		function({ addUtilities }) {
			addUtilities(
				{
					'.trans': {
						transition: 'all 300ms ease'
					},
					'.trans-opacity': {
						'transition-property': 'opacity'
					},
					'.trans-transform': {
						'transition-property': 'transform'
					},
					'.trans-color': {
						'transition-property': 'color'
					},
					'.trans-b-color': {
						'transition-property': 'border-color'
					},
					'.trans-bg': {
						'transition-property': 'background-color'
					},
					'.trans-fast': {
						'transition-duration': '150ms'
					},
					'.trans-normal': {
						'transition-duration': '300ms'
					},
					'.trans-slow': {
						'transition-duration': '750ms'
					}
				},
				{
					variants: ['responsive', 'hover']
				}
			)
		}
	]
}
