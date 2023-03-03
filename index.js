// const inquirer = require('inquirer')
// const connection = require('./server')
// const consoleTable = require('console.table')

// start = () => {
//     inquirer
//         .prompt({
//             name: 'select',
//             type: 'list',
//             message: 'Select an option',
//             choices: [
//                 'Add',
//                 'View',
//                 'Update',
//                 'Exit'
//             ]
//         }).then(input => {
//             switch (input.select) {
//                 case 'Add':
//                     add();
//                     break;

//                 case 'View':
//                     view();
//                     break;

//                 case 'Update':
//                     updateRoles();
//                     break;

//                 case 'Exit':
//                     connection.end();
//                     break;
//             }
//         });
// }

// add = () => {
//     inquirer 
//         .prompt({
//             name: 'select',
//             type: 'list',
//             message: 'What would you like to add?',
//             choices: [
//                 'Add Department',
//                 'Add Role',
//                 'Add Employee',
//                 'Exit'
//             ]
//         }).then(input => {
//             switch (input.select) {
//                 case 'Add Department':
//                     addDepartment();
//                     break;

//                 case 'Add Role':
//                     addRole();
//                     break;

//                 case 'Add Employee':
//                     addEmployee();
//                     break;

//                 case 'Exit':
//                     connection.end();
//                     break;
//             }
//         })
// }

// addDepartment = () => {
//     inquirer
//          .prompt([{
//             type: "submit",
//             message: "What department would you like to add?",
//             name: "new_department"
//         }]).then((input) => {
//         connection.query(
//             "INSERT INTO department SET ?",
//         {
//           department_name: input.new_department,
//         },
//         function(err, res) {
//             if (err) console.log(err);
//             console.log(err)
//             console.log(`${input.new_department} was added to departments.`);
//             start();
//         })
//     })        
// }

// addRole = () => {}

// addEmployee = () => {}

// view = () => {
//     inquirer 
//         .prompt({
//             name: 'select',
//             type: 'list',
//             message: 'What would you like to view?',
//             choices: [
//                 'View Departments',
//                 'View Roles',
//                 'View Employees',
//                 'Exit'
//             ]
//         }).then(input => {
//             switch (input.select) {
//                 case 'View Departments':
//                     viewDepartment();
//                     break;

//                 case 'View Roles':
//                     veiwRole();
//                     break;

//                 case 'View Employees':
//                     viewEmployee();
//                     break;

//                 case 'Exit':
//                     connection.end();
//                     break;
//             }
//         })
// }

// start()