const express = require("express");
const cors = require("cors");
const recipeRoutes = require("./routes/recipeRoute.js");
const path = require("path");
const app = express();
const authRoute = require("./routes/authRoute.js");
const commentRoutes = require("./routes/commentRoutes");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRoute);
app.use("/comments", commentRoutes);
app.use("/recipes", recipeRoutes);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listenning on port ${PORT}`);
});
