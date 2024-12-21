const { Router } = require("express");
const {
  getAllRecipies,
  getRecipesByUsername,
  getRecipeByID,
  postRecipe,
  updateRecipe,
  deleteRecipe,
  getCategories,
  getCategoriesByRecipe
} = require("../controllers/recipeController.js");

const router = Router();

router.get("/", getAllRecipies);
router.get("/:username", getRecipesByUsername);
router.get("/recipe/:id", getRecipeByID);
router.post("/", postRecipe);
router.put("/", updateRecipe);
router.delete("/:id", deleteRecipe);
router.get('/all/categories', getCategories)
router.get('/all/categories/:id', getCategoriesByRecipe)

module.exports = {
    recipeRouter : router
};
