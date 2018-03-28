employees = Employee.create(
	[
		{
			first_name: "Wallace",
			last_name: "David",
			title: "CEO",
			manager_id: nil
		},
		{
			first_name: "Michael",
			last_name: "Scott",
			title: "Regional Manager Scranton",
			manager_id: 1
		},
		{
			first_name: "Jan",
			last_name: "Levinson",
			title: "VP Northeast Sales",
			manager_id: 1
		},
		{
			first_name: "Dwight",
			last_name: "Schrute",
			title: "Assistant to the Regional Manager",
			manager_id: 1
		},
		{
			first_name: "Jim",
			last_name: "Halpert",
			title: "Sales",
			manager_id: 2
		},
		{
			first_name: "Angela",
			last_name: "Martin",
			title: "Head of Accounting",
			manager_id: 4
		},
		{
			first_name: "Oscar",
			last_name: "Martinez",
			title: "Accountant",
			manager_id: 5
		},
		{
			first_name: "Pam",
			last_name: "Beasley",
			title: "Secretary",
			manager_id: 5
		},
		{
			first_name: "Kelly",
			last_name: "Kapour",
			title: "Head of Customer Service",
			manager_id: 8
		},
		{
			first_name: "Ryan",
			last_name: "Howard",
			title: "Temp",
			manager_id: 4
		},
		{
			first_name: "Creed",
			last_name: "Bratton",
			title: "Quality Assurance",
			manager_id: 8
		}
	]
)