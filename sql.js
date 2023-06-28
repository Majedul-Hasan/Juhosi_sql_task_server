const mysql = require('mysql2');

const DATABASE_URL = 'mysql://jg4pey8xhvsp8ykejp6q:pscale_pw_4pzp8x8jdzj2RdkTUbkYazlipFXK9vfFvIeTzV7KixI@aws.connect.psdb.cloud/root?ssl={"rejectUnauthorized":true}'



// const connection = mysql.createConnection({
//   host: 'sql306.infinityfree.com',
//   user: 'if0_34513620',
//   password: 'L3VeYbfZweNL7t0',
//   database: 'if0_34513620_customer_system',
// });
// const connection = mysql.createConnection({
//   host: '0.0.0.0',
//   user: 'root',
//   password: 'hasan2023',
//   database: 'customer_system',
// });

const connection = mysql.createConnection(DATABASE_URL);
// console.log('Connected to PlanetScale!');

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

module.exports = connection;

