const bcrypt = require("bcryptjs");
const authModel = require("../models/authModel");

const register = async (req, res) => {
  const { first_name, last_name, email, username, password } = req.body;

  try {
    const existingUsername = await authModel.findUserByUsername(username);
    const existingUser = await authModel.findUserByEmail(email);

    if (existingUser) {
      return res.status(400).send("Email already exists");
    }

    if (existingUsername) {
      return res.status(400).send("Username already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await authModel.registerUser({
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      password: hashedPassword,
    });
    res.status(201).redirect("/login.html");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error while saving");
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await authModel.findUserByUsername(username);
    if (!user) {
      return res.status(401).send("Error: Incorrect username");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Error: Incorrect password");
    }
    res.redirect("/homepage.html");
  } catch (error) {
    console.error("Error connecting: ", error);
    res.status(500).send("Server error: unable to connect.");
  }
};

module.exports = { register, login };
