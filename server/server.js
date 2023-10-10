const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
app.use(cors());
app.listen(5000, () => {
  console.log("Server has started at port 5000");
});

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "user_data");

let db = null;
const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

initializeDbAndServer();

app.post("/serverregistration", async (request, response) => {
  const { id, name, email, number, password } = request.body;
  const cryptedPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO user_details (id,name,email,number,password) VALUES('${id}','${name}','${email}','${number}','${cryptedPassword}');`;
  const jwtToken = jwt.sign(email, "MY_KEY");
  await db.run(query);
  response.send({ jwt: jwtToken });
});

app.post("/serverlogin", async (request, response) => {
  const { email, password } = request.body;
  const query = `SELECT * FROM user_details WHERE email = '${email}';`;
  const resultDb = await db.get(query);
  if (resultDb === undefined) {
    response.status(401).send({ error: "Invalid login details" });
  } else {
    const checkPassword = await bcrypt.compare(password, resultDb.password);
    if (checkPassword) {
      const jwtToken = jwt.sign(email, "MY_KEY");
      response.send({ jwt: jwtToken });
    } else {
      response.status(401).send({ error: "Invalid Password" });
    }
  }
});
