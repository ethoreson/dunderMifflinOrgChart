// import React, { Component } from 'react'
// import axios from 'axios'

// class DirectReportsFrom extends Component {

// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			selectedManager: null
// 		}
// 	}

// 	handleChange = (selectedOption) => {
// 		this.setState({selectedOption})
// 		console.log({selectedOption})
// 	}

// 	// handleSubmit = (employee) => {
// 	// 	axios.get(`http://localhost:3001/employees/${this.props.employee.id}`)
// 	// 	.then(response => {
// 	// 		console.log(response)
// 	// 	})
// 	// 	.catch(error => console.log(error))
// 	// }

// 	displayDirectReports = (employee) => {
// 		return <option value={this.props.employees.id}>{this.props.employees.first_name} {this.props.employees.last_name}</option>
// 	}

// 	render() {
// 		return (
// 			<div className="findDirectReportsForm">
// 				{this.props.employees.map(displayDirectReports)}
// 			</div>
// 		)
// 	}

// }

// export default DirectReportsFrom