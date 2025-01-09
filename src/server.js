const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from 'public/photos' directory
app.use('/photos', express.static(path.join(__dirname, '..', 'public', 'photos')));
// console.log(express.static(path.join(__dirname, '..', 'public', 'photos')))
// ROUTES
const employeeRoutes = require('../src/routes/employee');
app.use('/api/employee', employeeRoutes);

const port = 5000;

app.listen(port, () => {
  console.log("Server running on port:", port);
});
