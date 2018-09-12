const R = require('ramda')
const glob = require('glob')
const path = require('path')
const fs = require('fs')
const PurgeCssPlugin = require('purgecss-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const sitemap = require('sitemap')
const pify = require('pify')
const config = require('./src/site.config')

const PATHS = {
	src: path.join(__dirname, 'src')
}

const purgeCssConfig = {
	paths: glob.sync(`${PATHS.src}/**/*.js`, { nodir: true }),
	extractors: [
		{
			extractor: class {
				static extract(content) {
					return content.match(/[A-Za-z0-9-_:/]+/g) || []
				}
			},
			extensions: ['js']
		}
	],
	whitelist: [''],
	whitelistPatterns: [/body/, /headroom/, /ReactModal/, /ril/]
}

exports.onCreateWebpackConfig = ({ actions, stage, getConfig }) => {
	const prevConfig = getConfig()

	actions.replaceWebpackConfig({
		...prevConfig,

		module: {
			...prevConfig.module,
			// add rules for the svg sprite loader
			rules: [
				...prevConfig.module.rules.map(item => {
					const { test } = item

					if (
						test &&
						test.toString() === '/\\.(ico|svg|jpg|jpeg|png|gif|webp)(\\?.*)?$/'
					) {
						return {
							...item,
							test: /\.(ico|jpg|jpeg|png|gif|webp)(\?.*)?$/
						}
					}

					return { ...item }
				}),
				{
					test: /\.svg$/,
					use: [
						{
							loader: require.resolve('svg-sprite-loader')
						}
					]
				}
			]
		}
	})

	actions.setWebpackConfig({
		resolve: {
			alias: {
				'~': `${__dirname}/src`,
				'node-fetch$': 'node-fetch/lib/index.js' // https://github.com/bitinn/node-fetch/issues/493
			}
		}
	})

	if (stage.includes('develop')) return

	// Add PurgeCSS in production
	// See: https://github.com/gatsbyjs/gatsby/issues/5778#issuecomment-402481270
	if (stage.includes('build')) {
		actions.setWebpackConfig({
			plugins: [
				new PurgeCssPlugin(purgeCssConfig),
				new OptimizeCSSAssetsPlugin({})
			]
		})
	}
}

exports.onCreateBabelConfig = ({ actions }) => {
	actions.setBabelPlugin({
		name: 'babel-plugin-ramda'
	})

	actions.setBabelPlugin({
		name: 'babel-plugin-emotion',
		options: {
			extract: true
		}
	})
}

exports.onPostBuild = async ({ graphql }) => {
	const resp = await graphql(`
		{
			craft {
				entries {
					uri
				}
			}
		}
	`)

	const {
		data: {
			craft: { entries }
		}
	} = resp

	const saved = path.join('./public', '/sitemap.xml')

	const map = sitemap.createSitemap({
		hostname: config.hostname,
		urls: R.compose(
			R.map(uri => ({
				url: `${config.hostname}/${uri}/`,
				changefreq: 'daily',
				priority: 0.7
			})),
			R.pluck('uri')
		)(entries)
	})
	const writeFile = pify(fs.writeFile)

	return writeFile(saved, map.toString())
}
