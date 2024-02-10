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
            let newEmp = await addEmployee();
            selection = `employees/${newEmp.fName}/${newEmp.lName}/${newEmp.roleEmp}/${newEmp.manager}`;
            method = `POST`;
            break;
        case 'Update an employee role':
            let empNewRole = await updateEmployeeRole();
            const {firstName, lastName} = splitName(empNewRole.employee);
            selection = `employees/${firstName}/${lastName}/${empNewRole.roleEmp}`;
            method = `PUT`;
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

const addEmployee = async () => {
    const newEmp = await inquirer.prompt([
        {
            type: 'input',
            name: 'fName',
            message: 'Please enter the first name of the emplyee'
        },
        {
            type: 'input',
            name: 'lName',
            message: 'Please enter the last name of the emplyee'
        },
        {
            type: 'list',
            name: 'roleEmp',
            message: 'Assign a role:',
            choices: [
                'Module Engineer',
                'Product Engineer',
                'Manufacturing Engineer',
                'Technician',
                'Operations Lead',
                'Operations Manager',
                'Analyst',
                'Payroll',
                'CFO',
                'HR Associate',
                'HR Manager',
                'Sales Lead',
                'Aquisitions Manager',
                'Marketing Analyst'
            ]
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Please enter the manager if applicable',
            choices: [
                'Michael',
                'Tristan',
                'John',
                'Blue',
                'Josie',
                'None'
            ]
        },
    ])
    const answer = newEmp;
    return answer;
}

const updateEmployeeRole = async () => {
    const employeeUpdate = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee to update?',
            choices: [
                'Michael Brax',
                'Tristan Thompson',
                'John True',
                'Blue Heeler',
                'Josie Feller',
                'John Crew',
                'Layannah Feller',
                'Blaine Johnson',
                'Johnny Sachue',
                'Desiree Pom',
                'Norina Abey',
                'Sue Zette',
                'Lisa Laing',
                'Edna Merin',
                'JC Hernandez',
                'Tyker Noname',
                'Nicole Rerf',
                'Erica Del'
            ]
        },
        {
            type: 'list',
            name: 'roleEmp',
            message: 'Select their new role',
            choices: [
                'Module Engineer',
                'Product Engineer',
                'Manufacturing Engineer',
                'Technician',
                'Operations Lead',
                'Operations Manager',
                'Analyst',
                'Payroll',
                'CFO',
                'HR Associate',
                'HR Manager',
                'Sales Lead',
                'Aquisitions Manager',
                'Marketing Analyst'
            ]
        }
    ])
    const answer = employeeUpdate;
    return answer;
}

function splitName(name) {
    const breakup = name.split(' ');
    const firstName = breakup[0];
    const lastName = breakup.slice(1).join(' ');
    return {firstName, lastName};
}

mainMenu();

module.exports = app;