const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const authRoute = require("./routes/authRoute.js");
const { db } = require("./config/data.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRoute);

async function getVersion() {
  const result = await db.raw("select version()");
  console.log(result.rows);
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

getVersion();
