const mysql = require('mysql2');
const connection = require('../sql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

const authenticateUser = async (req, res) => {
  const { user_id, password } = req.body;
  console.log({ user_id, password });

  connection.query(
    'SELECT * FROM auth_table WHERE user_id = ?',
    [user_id],
    (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      // Check if the user exists
      if (results.length === 0) {
        res.status(401).json({ message: 'Invalid  user_id or password' });
        return;
      }

      const user = results[0];

      // Compare the provided password with the hashed password stored in the database
      bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
        if (bcryptErr) {
          console.error('Error comparing passwords:', bcryptErr);
          res.status(500).json({ message: 'Internal server error' });
          return;
        }
        // Check if the passwords match
        if (!bcryptResult) {
          res.status(401).json({ message: 'Invalid email or password' });
          return;
        }

        const token = generateToken({ user_id });

        res.status(200).json({ token });
      });
    }
  );
};

const createUser = async (req, res) => {
  const { user_id, password, role } = req.body;
  console.log({ user_id, password, role });

  // Hash the password using bcrypt
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    console.log(hash.length);
    // Store the user details in the database
    const user = { user_id, role, password: hash };

    connection.query(
      'INSERT INTO auth_table SET ?',
      user,
      (queryErr, result) => {
        if (queryErr) {
          console.error('Error inserting user:', queryErr);
          res.status(500).json({ message: 'Internal server error' });
          return;
        }

        res.status(201).json({ message: 'User created successfully' });
      }
    );
  });
};

const userRole = async (req, res) => {
  const user_id = req.decoded.user_id;
  connection.query(
    'SELECT user_id, role FROM auth_table WHERE user_id = ?',
    [user_id],
    (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      // Check if the user exists
      if (results.length === 0) {
        res.status(401).json({ message: 'Invalid  user_id or password' });
        return;
      }
      const user = results[0];

      console.log(user);
      res.status(200).json(user);
    }
  );
};

module.exports = {
  authenticateUser,
  createUser,
  userRole,
};
