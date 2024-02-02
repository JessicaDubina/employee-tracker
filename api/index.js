const express = require('express');
const inquirer = require('inquirer');

const app = express();


inquirer.prompt([
    {
        type: 'list',
        name: 'mainMenuSelect',
        message: 'What would you like to do?',
        choices: [
            'View all departments', 
            'View all roles', 
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role'
        ]
    }
])
.then((answers) => {
    switch(answers) {
        case 'View all departments':
            //get department table
            fetch('/departments', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            break;
        case 'View all roles':
            //get roles table
            fetch('/roles', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            break;
        case 'View all employees':
            //get employees table
            break;
        case 'Add a department':
            //post to department table
            break;
        case 'Add a role':
            //post to roles table
            break;
        case 'Add an employee':
            //post to employee table
            break;
        case 'Update an employee role':
            //put to employee table
            break;
    }
})
//turn this into a (req, res) based on selection. 


module.exports = app;