const express = require('express');
const inquirer = require('inquirer');

const app = express();

app.get('/', (req, res) => {
    res.send('This worked!');
});



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

//firs tneed to populate list of options for user to choose from
//then use answer to go to next screen

module.exports = app;