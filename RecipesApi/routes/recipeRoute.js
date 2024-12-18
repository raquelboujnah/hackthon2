const {Router} = require('express')
const {getAllRecipies} = require('../controllers/recipeController.js')

const router = Router()

router.get('/', getAllRecipies)

module.exports = {
    recipeRouter : router
}