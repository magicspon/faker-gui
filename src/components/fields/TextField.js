import React, { Component } from 'react'

export default class TextField extends Component {
	state = {
		name: '',
		count: 3
	}

	onChange = e => {
		const {
			target: { value: name }
		} = e

		this.setState({ name })
	}

	onRangeChange = e => {
		const {
			target: { value: count }
		} = e

		this.setState({ count })
	}

	render() {
		const { name, count } = this.state
		const { onSubmit } = this.props

		return (
			<form
				className="border border-grey-brd p-1"
				onSubmit={e => {
					e.preventDefault()
					onSubmit(this.state)
				}}
			>
				<h3 className="mb-1 font-bold">plaintext</h3>
				<label htmlFor="plaintext" className="flex items-center mb-1">
					<span className="block text-ms--1 mr-1">Name</span>
					<input
						type="text"
						value={name}
						onChange={this.onChange}
						className="px-0-25 py-0-25 border-b-3 focus:border-teal outline-none block flex-1 trans"
					/>
				</label>
				<label htmlFor="plaintext" className="flex items-center mb-2">
					<span className="block text-ms--1 mr-1">word count</span>
					<input
						className="px-1 py-0-25 border block flex-1"
						type="range"
						min="1"
						max="100"
						steps="1"
						value={count}
						onChange={this.onRangeChange}
					/>
				</label>
				<button type="submit" className="bg-orange p-0-5 text-white">
					Add
				</button>
			</form>
		)
	}
}
