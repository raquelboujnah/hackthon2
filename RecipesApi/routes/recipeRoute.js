const { Router } = require("express");
const {
  getAllRecipies,
  getRecipesByUsername,
  getRecipeByID,
  postRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController.js");

const router = Router();

router.get("/", getAllRecipies);
router.get("/:username", getRecipesByUsername);
router.get("/recipe/:id", getRecipeByID);
router.post("/", postRecipe);
router.put("/", updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = {
    recipeRouter : router
};
