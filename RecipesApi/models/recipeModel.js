const {db} = require ('../config/data.js')

const getRecipesDB = () => {
    return db('recipes')
    .select('recipe_id', 'username', 'title', 'description', 'is_vegan', 'picture_url ', 'ingredients')
}

const getRecipesByUsernameDB = (username) => {
    return db('recipes')
    .select ('recipe_id', 'username', 'title', 'description', 'is_vegan', 'picture_url ', 'ingredients')
    .where ({username})
}

const getRecipeByIDDB = (id) => {
    return db('recipes')
    .select('recipe_id', 'username', 'title', 'description', 'is_vegan', 'picture_url ', 'ingredients')
    .where({recipe_id : id})
}

const postRecipeDB = (recipe) => {
    const {username, title, description, is_vegan, picture_url, ingredients } = recipe

    return db('recipes')
    .insert({username, title, description, is_vegan, picture_url, ingredients }, ['recipe_id', 'username', 'title', 'description', 'is_vegan', 'picture_url ', 'ingredients'])

}

const updateRecipeDB = (recipe) => {
    const {recipe_id, title, description, is_vegan, picture_url, ingredients } = recipe

    return db('recipes')
    .update({title, description, is_vegan, picture_url, ingredients}, ['recipe_id', 'username', 'title', 'description', 'is_vegan', 'picture_url ', 'ingredients'])
    .where({recipe_id})

}

const deleteRecipeDB = (id) => {
    return db('recipes')
    .del()
    .where({recipe_id: id})
    .returning('*')
}

module.exports = {getRecipesDB,
                getRecipesByUsernameDB,
                getRecipeByIDDB,
                postRecipeDB,
                updateRecipeDB,
                deleteRecipeDB
}