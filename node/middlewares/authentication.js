const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  console.log(req.header);
  const token = req.header('token');
  if (!token) {
    res.status(401).json({ status: 0, debug_data: 'token not found' });
  }
  try {
    const decodedToken = jwt.verify(token, 'secretString');
    console.log(decodedToken);
    next();
  } catch (err) {
    res.status(500).json({ status: 0, debug_data: 'token sent is not valid' });
  }
};
