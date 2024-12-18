const { db } = require("../config/data");

const registerUser = async (userData) => {
  return db("users").insert(userData).returning("*");
};

const findUserByUsername = async (username) => {
  return db("users").where({ username }).first();
};

const findUserByEmail = async (email) => {
  return db("users").where({ email }).first();
};

module.exports = { registerUser, findUserByUsername, findUserByEmail };
