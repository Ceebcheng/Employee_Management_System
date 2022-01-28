const fs = require('fs');
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
            message: "Please select one.",
            name: "listofOptions",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee" , "update an employee role"]

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
            default: viewallDepartments();
        }
    });
};

function viewallDepartments() {
    const sql = `SELECT * from department`;
  
  db.query(sql, (err, rows) => {
    if (err) {
        console.log(err);
       return;
    }
    console.table(rows);
  });
}
function viewallRoles() {
    const sql = `SELECT role.title, role.id, department.name, role.salary FROM role JOIN department ON role.department_id = department.id`;
  
  db.query(sql, (err, rows) => {
    if (err) {
        console.log(err);
       return;
    }
    console.table(rows);
  });
}
function viewallEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id`;
  
  db.query(sql, (err, rows) => {
    if (err) {
        console.log(err);
       return;
    }
    console.table(rows);
  });
}
function addDepartment() {
    console.log('viewallDepartments');
}
function addRole() {
    console.log('viewallDepartments');
}
function addEmplyoee() {
    console.log('viewallDepartments');
}
function updateemloyeeRole() {
    console.log('viewallDepartments');
}



listofOptions();