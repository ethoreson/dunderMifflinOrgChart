import React, { Component } from 'react'
import axios from 'axios'
import Employee from './Employee'
import update from 'immutability-helper'
import EmployeeForm from './EmployeeForm'
// import DirectReportsForm from './DirectReportsForm'
// import DirectReports from './DirectReports'

class HierarchyMap extends Component {

	constructor(props) {
		super(props)
		this.state = {
			employees: [],
			editingEmployeeId: null,
		}
	}

componentDidMount() {
  axios.get(`http://localhost:3001/employees.json`)
  .then(response => {
  		console.log(response.data[0]) // CEO
  		var shovelCeo = update(this.state.employees, {$splice: [[this.state.employees.length, 0, response.data[0]]]})
  		this.setState({employees: shovelCeo})
  		function collectEmployees(employee) {
  			if (employee.direct_reports.length > 0) {
			  	employee.direct_reports.forEach(function(manager) {
			  		console.log(manager)
			  		console.log("THIS:")
			  		console.log(this)
			  		var shovelManager = update(this.state.employees, {$splice: [[this.state.employees.length, 0, manager]]})
			  		this.setState({employees: shovelManager})
			  		collectEmployees(manager)
			  	})
			}
	  	}
  		for(var i=0; i < response.data[0].direct_reports.length; i++) {
  			console.log(response.data[0].direct_reports[i]) // ID 2, 3, 4, 15
  			var shovelThese = update(this.state.employees, {$splice: [[this.state.employees.length, 0, response.data[0].direct_reports[i]]]})
  			this.setState({employees: shovelThese})
  			collectEmployees(response.data[0].direct_reports[i])
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



render() {
		return (
			<div>
				{this.state.employees.map((employee) => {
					if(this.state.editingEmployeeId === employee.id) {
						return(<EmployeeForm employee={employee} key={employee.id} updateEmployee={this.updateEmployee} titleRef= {input => this.first_name = input} resetConfirmation={this.resetConfirmation}/>)
					} else {
						return (<Employee employee={employee} key={employee.id} onClick={this.enableEditing} onDelete={this.retireEmployee} />)
					}		
				})}
				<button className="hireEmployee" onClick={this.hireNewEmployee}>
					Hire Employee
				</button>
				<span className="confirmation">
					{this.state.notification}
				</span>
			</div>
		);
	}
}

export default HierarchyMap