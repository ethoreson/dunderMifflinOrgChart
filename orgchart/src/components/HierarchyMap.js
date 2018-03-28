import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import axios from 'axios'
import Employee from './Employee'
import update from 'immutability-helper'
import EmployeeForm from './EmployeeForm'

/**
* @class HierarchyMap
* @constructor
*/

class HierarchyMap extends Component {

	constructor(props) {
		super(props)
		this.state = {
			employees: [],
			editingEmployeeId: null,
			currentManager: 1
		}
	}

/**
* GET request from employees API. Shovels all employee objects into this.state's 'employees' array.
* @method collectEmployees
* @return {Object} 
*/

collectEmployees = (employee) => {
	axios.get(`http://localhost:3001/employees.json`)
	.then(response => {
		if (employee.direct_reports.length > 0) {
  			for(var i=0; i < employee.direct_reports.length; i++) {
	  			var shovelManager = update(this.state.employees, {$splice: [[this.state.employees.length, 0, employee.direct_reports[i]]]})
	  			this.setState({employees: shovelManager})
	  			if (employee.direct_reports[i].direct_reports.length > 0) {
  					this.collectEmployees(employee.direct_reports[i])
  				}
  			}
		}
	})
}

componentDidMount() {
  axios.get(`http://localhost:3001/employees.json`)
  .then(response => {
  		var shovelCeo = update(this.state.employees, {$splice: [[this.state.employees.length, 0, response.data[0]]]})
  		this.setState({employees: shovelCeo})
  		for(var i=0; i < response.data[0].direct_reports.length; i++) {
  			var shovelThese = update(this.state.employees, {$splice: [[this.state.employees.length, 0, response.data[0].direct_reports[i]]]})
  			this.setState({employees: shovelThese})
  			this.collectEmployees(response.data[0].direct_reports[i])
  		}
  })
  .catch(error => console.log(error))
}

hireNewEmployee = () => {
	axios.post(
		`http://localhost:3001/employees`,
		{ employee:
			{
				first_name: '',
				last_name: '',
				title: '',
				manager_id: ''
			}
		}
	)
	.then(response => {
		const employees = update(this.state.employees, {
			$splice: [[this.state.employees.length, 0, response.data]]
		})
	this.setState({employees: employees, editingEmployeeId: response.data.id})
	})
	.catch(error => console.log(error))
}

updateEmployee = (employee) => {
	const employeeIndex = this.state.employees.findIndex(x => x.id === employee.id)
	const employees = update(this.state.employees, {
		[employeeIndex]: { $set: employee }
	})
	this.setState({employees: employees})
}

enableEditing = (id) => {
	this.setState({editingEmployeeId: id},
		() => { this.first_name.focus() })
}

retireEmployee = (id) => {
	axios.delete(`http://localhost:3001/employees/${id}`)
	.then(response => {
		const employeeIndex = this.state.employees.findIndex(x => x.id === id)
		const employees = update(this.state.employees, { $splice: [[employeeIndex, 1]]})
		this.setState({employees: employees})
	})
	.catch(error => console.log(error))
}

handleChange = (event) => {
	this.setState({currentManager: event.target.value})
	const element = <h2>Direct Reports:</h2>
	ReactDOM.render(element, document.getElementById('directReportsHeader'))
	console.log(this.state.currentManager)
}

/**
* @property HierarchyMapDOM
* @type HTMLElement
*/

render() {

	const employees = this.state.employees
	const namesList = employees.map(name => {
		return (
			<option key={name.id} value={name.id}>{name.first_name} {name.last_name}</option>
		)
	})
	return (
			<div>
				<div className="gridContainer">
				{this.state.employees.map((employee) => {
					if(this.state.editingEmployeeId === employee.id) {
						return(<EmployeeForm employee={employee} key={employee.id} updateEmployee={this.updateEmployee} titleRef= {input => this.first_name = input} resetConfirmation={this.resetConfirmation}/>)
					} else {
						return (<Employee employee={employee} key={employee.id} onClick={this.enableEditing} onDelete={this.retireEmployee} />)
					}		
				})}
				</div>
				<button className="hireEmployee" onClick={this.hireNewEmployee}>
					Hire Employee
				</button>
				<div className="formClass">
					<h2>Select a manager to see their direct reports:</h2>
					<form className="findDirectReportsForm" onSubmit={this.handleSubmit}>
						<select name="emp" value={this.state.currentManager} onChange={this.handleChange}>
							{namesList}
						</select>
					</form>
				<div id="directReportsHeader">
				</div>
				</div>
				<div className="directReportsDisplay">
				{this.state.employees.map((employee) => {
					 if(employee.manager_id == this.state.currentManager) {
					 	return(<Employee employee={employee} key={employee.id} />)
					 }
				})}
				</div>
			</div>
		);
	}
}

export default HierarchyMap