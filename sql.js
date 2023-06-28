const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'sql306.infinityfree.com',
//   user: 'if0_34513620',
//   password: 'L3VeYbfZweNL7t0',
//   database: 'if0_34513620_customer_system',
// });
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'hasan2023',
  database: 'customer_system',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

module.exports = connection;

