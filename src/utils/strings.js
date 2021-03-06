import * as R from 'ramda'

export const removeSpecialCharacters = R.compose(
	R.trim,
	R.replace(/\s+/g, ' '),
	R.replace(/[^a-zA-Z\d\s:]/g, '')
)

export const pascalify = R.memoizeWith(R.identity, str =>
	R.compose(
		R.join(''),
		R.over(R.lensIndex(0))(R.toUpper),
		R.replace(/[\s]+(.)?/g, (match, ch) => (ch ? R.toUpper(ch) : '')),
		R.toLower,
		removeSpecialCharacters
	)(str)
)

export const camelify = R.memoizeWith(R.identity, str =>
	R.compose(
		R.replace(/[\s]+(.)?/g, (match, ch) => (ch ? R.toUpper(ch) : '')),
		R.toLower,
		removeSpecialCharacters,
		R.replace('-', ' ')
	)(str)
)

export const slugify = R.memoizeWith(R.identity, str =>
	R.compose(
		R.replace(/[\s]+(.)?/g, (match, ch) => (ch ? `-${R.toLower(ch)}` : '')),
		R.toLower,
		removeSpecialCharacters
	)(str)
)

export const snakeify = R.memoizeWith(R.identity, str =>
	R.compose(
		R.replace(/[\s]+(.)?/g, (match, ch) => (ch ? `_${R.toLower(ch)}` : '')),
		R.toLower,
		removeSpecialCharacters
	)(str)
)

export const segmentize = R.compose(
	R.filter(R.identity),
	R.split('/'),
	R.replace(/(^\/+|\/+$)/g, '')
)

export const beautifyPath = R.compose(
	R.join('/'),
	segmentize
)

export const leadingSlashPath = str => `/${beautifyPath(str)}`

export const slugFromPath = R.compose(
	R.last,
	segmentize
)

export const titleCase = str => {
	const output = str.toLowerCase().split(' ')
	for (let i = 0; i < output.length; i += 1) {
		output[i] = output[i].charAt(0).toUpperCase() + output[i].slice(1)
	}
	return output.join(' ')
}

export function camelize(str) {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => index == 0 ? letter.toLowerCase() : letter.toUpperCase())
		.replace(/\s+/g, '')
}
