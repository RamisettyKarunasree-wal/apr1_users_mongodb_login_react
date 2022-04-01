const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authenticationMiddleware = require('../middlewares/authentication');
exports.createUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.json({ status: 0, data: 'user already exists' });
  } else {
    let encryptedPassword;
    try {
      let salt = bcrypt.genSaltSync(10);
      encryptedPassword = bcrypt.hashSync(req.body.password, salt);
      console.log(encryptedPassword);
    } catch (err) {
      console.log('in catch');
      res.json(err);
    }
    const userOb = new User({
      name: req.body.name,
      email: req.body.email,
      dob: req.body.dob,
      password: encryptedPassword,
    });
    userOb.save((err) => {
      if (err) {
        res.json(err);
      } else {
        res.json({ status: 1, data: 'user created successfully' });
      }
    });
  }
};
exports.getUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.json(err);
    } else {
      res.json(users);
    }
  });
};
exports.getUser = [
  authenticationMiddleware,
  async (req, res) => {
    console.log(req.headers);
    const userOb = await User.findOne({ email: req.params.email });
    res.json({ status: 1, data: userOb });
  },
];
exports.loginUser = async (req, res) => {
  const userOb = await User.findOne({ email: req.body.email });
  if (!userOb) {
    res.json({ status: 0, data: 'user not found' });
  } else {
    const passCorrect = bcrypt.compareSync(req.body.password, userOb.password);
    if (!passCorrect) {
      res.json({ status: 0, data: 'user credentials wrong' });
    }
    const payload = {
      user: {
        email: req.body.email,
      },
    };
    jwt.sign(payload, 'secretString', { expiresIn: 1200 }, (err, token) => {
      if (err) {
        res.json(err);
      } else {
        res.json({ status: 1, token: token });
      }
    });
  }
};
exports.listUsers = [
  authenticationMiddleware,
  (req, res) => {
    User.find((err, users) => {
      if (err) {
        res.json(err);
      } else {
        res.json(users);
      }
    });
  },
];
exports.editUser = [
  authenticationMiddleware,
  (req, res) => {
    let encryptedPassword;
    try {
      let salt = bcrypt.genSaltSync(10);
      encryptedPassword = bcrypt.hashSync(req.body.password, salt);
    } catch (err) {
      res.json(err);
    }
    const userOb = User({
      name: req.body.name,
      email: req.body.email,
      dob: req.body.dob,
      password: encryptedPassword,
    });
    User.updateOne({ email: req.params.email }, req.body, (err) => {
      if (err) {
        res.json({ status: 0, err });
      } else {
        res.json({ status: 1, data: 'user details modified successfully' });
      }
    });
  },
];
