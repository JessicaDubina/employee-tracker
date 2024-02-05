const express = require('express');
const inquirer = require('inquirer');
const path = require('path');

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
.then((answer) => {
    let selection = '';
    let method = '';
    switch(answer.mainMenuSelect) {
        case 'View all departments':
            selection = 'department';
            method = 'GET';
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

        default:
            console.log('Please pick a valid option');
            return;
    }
    fetch(`http://localhost:3001/${selection}`, {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        if (!response.ok) {
            console.log('HTTP error');
        }
        return response.json();
    })
    .then(data => {
        console.table(data);
    })
    .catch(error => {
        console.error(error);
    })
})

module.exports = app;