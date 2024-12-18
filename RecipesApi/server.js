const express = require("express");
const cors = require("cors");
const { recipeRouter } = require("./routes/recipeRoute.js");
const path = require("path");
const app = express();
const authRoute = require("./routes/authRoute.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listenning on port ${PORT}`);
});

app.use(cors());

app.use("/recipes", recipeRouter);
async function getVersion() {
  const result = await db.raw("select version()");
  console.log(result.rows);
}
