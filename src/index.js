require('dotenv').config();
const express = require('express');
const { login, register } = require('./controllers/Auth');
const { checkToken } = require('./middlewares/Validate');
const { homePage } = require('./controllers/Home');

const port = 3000;
const app = express();
app.use(express.json());

app.get("/", checkToken, homePage);
app.post("/register", register);
app.post("/login", login);

app.listen(port, () => {
  console.log("App running on port ", port);
})
