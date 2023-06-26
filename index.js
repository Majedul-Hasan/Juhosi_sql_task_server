const express = require('express');
require('dotenv').config();
const connection = require('./sql');
const morgan = require('morgan');
const cors = require('cors');

const Route = require('./routes/router.js');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 3000;

connection.connect();

app.use('', Route);

app.get('/', (req, res) => {
  res.send('Hello from Node.js!');
});

app.listen(PORT, () => {
  console.log(`Node.js server running on port ${PORT}`);
});
