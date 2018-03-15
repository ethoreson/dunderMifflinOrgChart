class EmployeesController < ApplicationController

	def index
		@employee = Employee.find(1)
		@employees = [userHash(@employee)]
		render json: @employees
	end

  	def userHash(user)
	    data = {
	    	id: user.id,
	      first_name: user.first_name,
	      last_name: user.last_name,
	      title: user.title,
	      manager_id: user.manager_id,
	      direct_reports: Employee.select { |employee| employee.manager_id == user.id}.map do |employee|
	      	userHash(employee)
	      end
	  	}
  end

	def create
		@employee = Employee.create(employee_params)
		render json: @employee
	end

	def update
		@employee = Employee.find(params[:id])
		@employee.update_attributes(employee_params)
		render json: @employee
	end

	def destroy
		@employee = Employee.find(params[:id])
		if @employee.destroy
			head :no_content, status: :ok
		else 
			render json: @employee.errors, status: :unprocessable_entity
		end
	end

	private

	def employee_params
		params.require(:employee).permit(:first_name, :last_name, :title, :manager_id)
	end
end
