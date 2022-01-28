const inquirer = require("inquirer");
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.user,
      password: process.env.password,
      database: process.env.database
    },
    console.log(`Connected to the company_db database.`)
  );

const listofOptions = () => {
    return inquirer.prompt([
        {
            type: "list",
            message: "Welcome! Please select one.",
            name: "listofOptions",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee" , "update an employee role" , "QUIT"]

        }
    ])

    .then(userChoice => {
        switch (userChoice.listofOptions) {
            case "view all departments":
                viewallDepartments();
                break;
            case "view all roles":
                viewallRoles();
                break;
            case "view all employees":
                viewallEmployees();
                break;
            case "add a department":
                addDepartment();
                break;
            case "add a role":
                addRole();
                break;
            case "add an employee":
                addEmplyoee();
                break;
            case "update an employee role":
                updateemloyeeRole();
                break;
            case "QUIT":
                db.end();
                break;
            default:
                viewallDepartments();
        }
    });
};

function viewallDepartments() {
    const sql = `SELECT * from department`;
  
  db.query(sql, (err, res) => {
    if (err) {
        console.log(err);
       return;
    }
    console.table(res);
    listofOptions();
  }); 
}
function viewallRoles() {
    const sql = `SELECT role.title, role.id, department.name, role.salary FROM role JOIN department ON role.department_id = department.id`;
  
  db.query(sql, (err, res) => {
    if (err) {
        console.log(err);
       return;
    }
    console.table(res);
    listofOptions();
  }); 
}
function viewallEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id`;
  
  db.query(sql, (err, res) => {
    if (err) {
        console.log(err);
       return;
    }
    console.table(res);
    listofOptions();
  });
}
function addDepartment() {
    inquirer.prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What is the name of the department you would like to add?",
      },
    ])
    .then(function (answer) {
        const sql = "INSERT INTO department (name) VALUE (?)";
      db.query(sql, answer.newDepartment, function (err, res) {
        if (err) throw err;
        console.log(`Successfully Added Department!`);
        listofOptions();
      });
    });
}
function addRole() {
    inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary?",
      },
      {
        type: "list",
        name: "departmentID",
        message:
          "What is the Department ID for this new role? Please select 1 for Sales, 2 for Developers, 3 for HR",
        choices: [1, 2, 3]
      },
    ])
    .then(function (answer) {
        const sql = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
      db.query(sql,[answer.title, answer.salary, answer.departmentID],function (err, res) {
          if (err) throw err;
            console.log(`Successfully Added Role: ${answer.title}`);
            listofOptions();
          }
      )}
    )
}
function addEmplyoee() {
    inquirer.prompt([
      {
        type: "input",
        name: "employeefirstName",
        message: "What is the employee's first name",
      },
      {
        type: "input",
        name: "employeelastName",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "employeeroleID",
        message: "What is the employee's role ID?",
      },
      {
        type: "input",
        name: "managerID",
        message: "What is your manager ID?",
      }
    ])
    .then(function (answer) {
        const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      db.query(sql,[answer.employeefirstName, answer.employeelastName, answer.employeeroleID, answer.managerID],function (err, res) {
          if (err) throw err;
            console.log(`Successfully Added Role: ${answer.employeefirstName}`);
            listofOptions();
          }
      )}
    )
}
function updateemloyeeRole() {
    console.log('Update Employee Role');
    listofOptions();
}

listofOptions();