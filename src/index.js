require('dotenv').config({path: ['.docker.env', '.env']});
const express = require('express');
const cors = require('cors');
const { login, register, validateUser } = require('./controllers/Auth');
const { checkToken } = require('./middlewares/Validate');
const { homePage } = require('./controllers/Home');

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", checkToken, homePage);
app.get("/validateuser", validateUser);
app.post("/register", register);
app.post("/login", login);

app.listen(port, () => {
  console.log("App running on port ", port);
})
