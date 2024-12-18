const {getRecipesDB} = require ('../models/recipeModel.js')

const getAllRecipies = async (req, res) => {
    try {
        const response = await getRecipesDB()
        res.json(response)
    } catch (error) {
        console.log(error)
        res.json({message : 'Internal Serveur Error'})
    }
}

module.exports = {getAllRecipies}