const express = require('express');
const mysql = require('mysql2');
// const path = require('path');
const api = require('./api/index.js');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', api);

//connect to the database
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the books_db database.`)
  );

const init = () => {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '/api/index.js'));
    })
}

init();

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);