require('dotenv').config({ path: ['.docker.env', '.env'] });
const express = require('express');
const cors = require('cors');
const { login, register, validateUser, logout } = require('./controllers/Auth');
const { checkToken } = require('./middlewares/Validate');
const { homePage } = require('./controllers/Home');
const { redis } = require('./utils/redis');

const port = 3000;
const app = express();

app.use(cors({
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.get("/", checkToken, homePage);
app.get("/validateuser", validateUser);
app.post("/register", register);
app.post("/login", login);
app.post("/logout", logout);

app.listen(port, async () => {
  redis.connect();
  console.log("App running on port ", port);
})
