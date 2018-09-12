import faker from 'faker'

export const plainText = count => faker.lorem.words(count)

export const richText = count =>
	Array.from({ length: count })
		.map(() => `<p>${faker.lorem.paragraph()}</p>`)
		.join('')
