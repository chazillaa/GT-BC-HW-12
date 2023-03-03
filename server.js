const mysql = require('mysql2');
const inquirer = require('inquirer')
const consoleTable = require('console.table')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'docker',
    database: 'tracker_db'
  })

db.connect((err) => {
    if(err){
        throw err
    }
    start()
})

start = () => {
    inquirer
        .prompt({
            name: 'select',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'Add',
                'View',
                'Update',
                'Exit'
            ]
        }).then(input => {
            switch (input.select) {
                case 'Add':
                    add();
                    break;

                case 'View':
                    view();
                    break;

                case 'Update':
                    updateRoles();
                    break;

                case 'Exit':
                    db.end();
                    break;
            }
        });
}

add = () => {
    inquirer 
        .prompt({
            name: 'select',
            type: 'list',
            message: 'What would you like to add?',
            choices: [
                'Add Department',
                'Add Role',
                'Add Employee',
                'Exit'
            ]
        }).then(input => {
            switch (input.select) {
                case 'Add Department':
                    addDepartment();
                    break;

                case 'Add Role':
                    addRole();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Exit':
                    db.end();
                    break;
            }
        })
}

addDepartment = () => {
    inquirer
         .prompt([{
            type: 'submit',
            message: 'What department would you like to add?',
            name: 'new_department'
        }]).then((input) => {
            db.query(
              'INSERT INTO department SET ?',
              {
                department_name: input.new_department,
              },
              function (err, res) {
                if (err) throw err;
                console.log(`${input.new_department} was added.`);
                start();
              }
            );
    })        
}

addRole = () => {
    db.query('SELECT * FROM department', function (err, res) {
        if (err) throw err
        let departments = res.map((data) => ({
            name: data.department_name,
            value: data.id,
        }))
        inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is this role?',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary for this role?',
        },
        {
          type: 'list',
          name: 'dept',
          message: 'Which department does this role belong in?',
          choices: departments,
        },
      ])
      .then((input) => {
          db.query(
          'INSERT INTO role SET ?',
          {
            title: input.title,
            salary: input.salary,
            department_id: input.dept,
          },
          function (err, res) {
            if (err) throw err;
            console.log(`${input.title} was added.`);
            start();
          }
        );
      });
    })
}

addEmployee = () => {
    db.query('SELECT * FROM role', function(err, res) {
        if (err) throw err
        let roles = res.map((role) => ({
            name: role.title,
            value: role.id,
        }))
    db.query('SELECT * FROM employee WHERE manager_id IS null', function(err, res) {
        if (err) throw err
        let managers = res.map((manager) => ({
            name: manager.first_name + ' ' + manager.last_name,
            value: manager.id,
        }))
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the first name of the employee?',
                  },
                  {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is the last name of the employee?',
                  },
                  {
                    type: 'list',
                    name: 'role',
                    message: 'What is the role of the employee?',
                    choices: roles,
                  },
                  {
                    type: 'list',
                    name: 'manager',
                    message: 'Who will be managing the employee?',
                    choices: managers,
                  },
            ]).then((input) => {
                db.query('INSERT INTO employee SET ?', {
                    first_name: input.first_name,
                    last_name: input.last_name,
                    role_id: input.role,
                    manager_id: input.manager,
                }, function (err, res) {
                    if (err) throw err
                    console.log(`${input.first_name} ${input.last_name}, was added.`)
                })
            })
         })
    })
}

view = () => {
    inquirer 
        .prompt({
            name: 'select',
            type: 'list',
            message: 'What would you like to view?',
            choices: [
                'View Departments',
                'View Roles',
                'View Employees',
                'Exit'
            ]
        }).then(input => {
            switch (input.select) {
                case 'View Departments':
                    viewDepartments();
                    break;

                case 'View Roles':
                    viewRoles();
                    break;

                case 'View Employees':
                    viewEmployees();
                    break;

                case 'Exit':
                    db.end();
                    break;
            }
        })
}

viewDepartments = () => {
    db.query(
        'SELECT department.id AS ID, department_name AS Department FROM department',
        function (err, res) {
          if (err) {
            console.log(err);
          } else {
            console.table(res);
          }
          start();
        }
      );
}

viewRoles = () => {
    db.query(
        'SELECT role.id AS ID, title AS Title, salary AS Salary, department_id AS Department FROM role',
        function (err, res) {
          if (err) {
            console.log(err);
          } else {
            console.table(res);
          }
          start();
        }
      );
}

viewEmployees = () => {
    db.query(
        'SELECT first_name, last_name, role.title FROM employee INNER JOIN role ON role.id=employee.role_id',
        function (err, res) {
          if (err) {
            console.log(err);
          } else {
            console.table(res);
          }
          start();
        }
      );
}

updateRoles = () => {
    let employees = {name: [], id: []}
    let roles = {id: [], title: []}
        db.query('SELECT first_name, last_name, id FROM employee', (err, res) => {
        err ?
          console.error(err) :
          res.forEach((data) => {
            employees.name.push(`${data.first_name} ${data.last_name}`)
            employees.id.push(data.id)
          })
       
        db.query('SELECT id, title FROM role', (err, res) => {
        err?
          console.error(err) :
          res.forEach((data)=>{
            roles.id.push(data.id)
            roles.title.push(data.title)
          })
        })
    inquirer
        .prompt([
      {
        message: 'Which employee would you like to update?',
        type: 'list',
        name: 'updateEmployee',
        choices: employees.name,
      },
      {
        message: 'What is the employees new role?',
        type: 'list',
        choices: roles.title,
        name: 'updateRole',
      }]).then((data) => {
        let employee = employees.name.indexOf(data.updateEmployee)
        let id = roles.title.indexOf(data.updateRole)
            db.query('UPDATE employee SET ? WHERE ?', [
                { role_id: roles.id[id] },
                { id: employees.id[employee]}
            ])
            console.log(`${data.updateEmployee} has been changed to ${data.updateRole}`)
            start()
      }).catch (err => console.log(err))
    })   
}