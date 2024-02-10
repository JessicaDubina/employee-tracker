const express = require('express');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to the database
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the database.`)
  );

//handle get request for department table
app.get('/department', (req, res) => {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.send(rows);
  });
  //after displaying - should route back to landing questions
});

//handler for roles table
app.get('/roles', (req, res) => {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.send(rows);
  });
  //route back to landing
});

//handler for employees table
app.get('/employees', (req, res) => {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.send(rows);
  });
  //route back to landing
});

//handler for adding a department
app.post(`/department/:name`, (req, res) => {
  const sql = `INSERT INTO department (name) VALUES (?);`;
  const param = req.params.name;
  db.query(sql, param, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json(`Successfully added ${param}`);
  });
  //route back to landing
});

//handler for adding a role
app.post(`/roles/:role/:department/:salary`, (req, res) => {
  const sql = `INSERT INTO roles (job_title, department_id, salary) VALUES (?, ?, ?);`;
  const paramRole = req.params.role;
  const paramDept = req.params.department;
  const paramSal = req.params.salary;
  
  const sql2 = `SELECT id FROM department WHERE name = ?`
  const roleDept = db.query(sql2, paramDept, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
        return;
    }
    let deptId = result[0].id

    db.query(sql, [paramRole, deptId, paramSal], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
          return;
      }
        res.json(`Successfully added ${paramRole}`);
      });

  });
  //route back to landing
});

//handler for adding an employee
app.post(`/employees/:fname/:lname/:role/:manager`, async (req, res) => {
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager) VALUES (?, ?, ?, ?);`;
  const fName = req.params.fname;
  const lName = req.params.lname;
  const role = req.params.role;
  const manager = req.params.manager;
  
  try {
    const roleId = await getRoleId(role);
    const mId = await getMrgId(manager);

    db.query(sql, [fName, lName, roleId, mId], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(`Successfully added ${fName} ${lName}`);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getRoleId(role) {
  const sql2 = `SELECT id FROM roles WHERE job_title = ?`;
  return new Promise((resolve, reject) => {
    db.query(sql2, role, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0].id);
      }
    });
  });
}

async function getMrgId(manager) {
  const sql3 = `SELECT id FROM employees WHERE first_name = ?`;
  return new Promise((resolve, reject) => {
    if (manager === "None") {
      resolve(null);
    } else {
      db.query(sql3, manager, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0].id);
        }
      });
    }
  });
}

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);