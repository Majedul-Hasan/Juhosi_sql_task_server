const express = require('express');
const connection = require('./sql');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

connection.connect();

app.get('/', (req, res) => {
  res.send('Hello from Node.js!');
});

app.listen(3000, () => {
  console.log('Node.js server running on port 3000');
});
