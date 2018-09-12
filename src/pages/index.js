import React, { Component, Fragment } from 'react'
import TextField from '~/components/fields/TextField'
import * as contentTypes from '~/utils/content'

export default class IndexPage extends Component {
	state = {
		items: {},
		currentFieldType: false
	}

	renderItem = currentFieldType => {
		if (currentFieldType === 'plainText') {
			return <TextField onSubmit={this.onSubmit} />
		}

		if (currentFieldType === 'richText') {
			return <TextField onSubmit={this.onSubmit} />
		}
	}

	onSubmit = ({ name, count }) => {
		const { items, currentFieldType } = this.state

		this.setState({
			items: {
				...items,
				[name]: contentTypes[currentFieldType](count)
			},
			currentFieldType: false
		})
	}

	render() {
		const { items, currentFieldType } = this.state
		return (
			<Fragment>
				<header className="p-2">
					<h1>faker.gui</h1>
				</header>
				<div className="px-2 lg:grid">
					<div className="lg:col-start-1 lg:col-end-13">
						<h2 className="mb-1">Field type</h2>
						<ul className="list-reset flex items-start">
							<li className="mr-1 mb-1">
								<button
									type="button"
									className="p-0-5 bg-orange hover:shadow-orange hover:text-orange hover:bg-white trans text-white"
									onClick={() => {
										this.setState({ currentFieldType: 'plainText' })
									}}
								>
									plain text
								</button>
							</li>
							<li className="mr-1 mb-1">
								<button
									type="button"
									className="p-0-5 bg-orange text-white"
									onClick={() => {
										this.setState({ currentFieldType: 'richText' })
									}}
								>
									body
								</button>
							</li>
						</ul>
						{currentFieldType && <div>{this.renderItem(currentFieldType)}</div>}
					</div>
					<div className="lg:col-start-13 lg:col-end-25">
						<h2 className="mb-1">JSON</h2>
						<pre>{JSON.stringify(items, null, 2)}</pre>
					</div>
				</div>
			</Fragment>
		)
	}
}
