const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// MIDDLEWARE
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// ROUTES
const employeeRoutes = require('../src/routes/employee')
app.use('/api/employee', employeeRoutes)
// console.log("employeeRoutes:", employeeRoutes)
const port = 5000;

app.listen(port, () => {
  console.log("opening port:", port)

})