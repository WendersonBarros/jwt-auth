const jwt = require('jsonwebtoken');

module.exports = {
  checkToken: async (req, res, next) => {
    const [, token] = req.headers.authorization?.split(' ') || [null, null];

    if (!token) {
      return res.status(401).send("Invalid token!");
    }

    try {
      jwt.verify(token, process.env.PRIVATE_KEY);
      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).send("Invalid token!");
    }
  }
};
