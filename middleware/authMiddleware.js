const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  // console.log(authorization);
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: 'unauthorized access' });
  }
  const token = authorization.split(' ')[1];
  console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: true, message: err });
    }
    req.decoded = decoded;
    next();
  });
};

const tokenPost = (req, res) => {
  const user = req.body;
  const token = generateToken(user);

  res.send({ token });
};

module.exports = { verifyJWT, tokenPost };
