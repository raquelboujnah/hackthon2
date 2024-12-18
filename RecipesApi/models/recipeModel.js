const {db} = require ('../config/data.js')

const getRecipesDB = () => {
    return db('recipes')
    .select('recipe_id', 'username', 'title', 'description', 'is_vegan')
}

module.exports = {getRecipesDB}