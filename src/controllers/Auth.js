const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { query } = require('../database/database');

module.exports = {
  login: async (req, res) => {
    const { login, password } = req.body;

    try {
      const user = await query({
        text: 'SELECT * FROM account WHERE login = $1',
        values: [login]
      });

      if (!user.rows.length) {
        return res
          .status(401)
          .send("Login incorrect or account not registered!");
      }

      const passwordMatch = await bcrypt.compare(
        password, user.rows[0].password
      );

      if (!passwordMatch) {
        return res
          .status(401)
          .send("Login or Password incorrect!");
      }

      const userInfoToSend = {
        id: user.rows[0].id,
        name: user.rows[0].name
      };

      const token = jwt.sign(
        userInfoToSend,
        process.env.PRIVATE_KEY,
        { expiresIn: '2h' }
      );

      return res.status(200).json({ ...userInfoToSend, token });
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .send("There might be a problem. Please, try again.")
    }
  },

  register: async (req, res) => {
    const { name, login, password } = req.body;

    if (!name || !login || !password) {
      return res.status(400).send("Please fill out all required fields.");
    }

    try {
      const hashedPass = await bcrypt.hash(password, 10);

      await query({
        text: 'INSERT INTO account (name, login, password) VALUES ($1, $2, $3)',
        values: [name, login, hashedPass]
      });

      return res.status(201).send("Account registered successfully!");
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .send("There might be a problem. Please, try again.")
    }
  },

  validateUser: async (req, res) => {
    const [, token] = req.headers.authorization.split(" ");

    try {
      const { id, name } = jwt.verify(token, process.env.PRIVATE_KEY);

      return res.status(200).send({ id, name });
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .send("Token invalid or incorrect!");
    }
  },
};
