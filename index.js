const express = require('express');
const inquirer = require('inquirer');
const path = require('path');

const app = express();

async function mainMenu() {
    const answer = await inquirer.prompt([
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
            ],
            loop: true
        }
    ])
    switch(answer.mainMenuSelect) {
        case 'View all departments':
            selection = 'department';
            method = 'GET';
            break;
        case 'View all roles':
            selection = 'roles';
            method = 'GET';
            break;  
        case 'View all employees':
            selection = 'employees';
            method = 'GET';
            break;
        case 'Add a department':
            let deptName = await addDepartment();
            selection =`department/${deptName}`
            method = 'POST'
            break;
        case 'Add a role':
            let newRole = await addRole();
            selection = `roles/${newRole.role}/${newRole.roleDept}/${newRole.salary}`;
            method = `POST`;
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
}

const addDepartment = async () => {
    const deptName = await inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'Please enter the new department name'
        }
    ])
    const answer = deptName['newDepartment'];
    console.log(answer);
    return answer;
}

const addRole = async () => {
    const newRole = await inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'Please enter the new job title'
        },
        {
            type: 'list',
            name: 'roleDept',
            message: 'Which department does this role belong?',
            choices: [
                'Engineering',
                'Operations',
                'Finance',
                'HR',
                'Sales'
            ]
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Please enter the salary'
        },
    ])
    const answer = newRole;
    return answer;
}

mainMenu();

module.exports = app;