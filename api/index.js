const express = require('express');
const inquirer = require('inquirer');

const app = express();

const mainMenu = () => {
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
}

mainMenu();
//turn this into a (req, res) based on selection. 


module.exports = app;