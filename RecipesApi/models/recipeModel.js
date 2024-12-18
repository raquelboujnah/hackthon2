const {db} = require ('../config/data.js')

const getRecipesDB = () => {
    return db('recipes')
    .select('recipe_id', 'username', 'title', 'description', 'is_vegan', 'picture_url ')
}

const getRecipesByUsernameDB = (username) => {
    return db('recipes')
    .select ('recipe_id', 'username', 'title', 'description', 'is_vegan', 'picture_url ')
    .where ({username})
}

const getRecipeByIDDB = (id) => {
    return db('recipes')
    .select('recipe_id', 'username', 'title', 'description', 'is_vegan', 'picture_url ')
    .where({recipe_id : id})
}

const postRecipeDB = (recipe) => {
    const {username, title, description, is_vegan, picture_url } = recipe

    return db('recipes')
    .insert({username, title, description, is_vegan, picture_url }, ['recipe_id', 'username', 'title', 'description', 'is_vegan', 'picture_url '])

}

const updateRecipeDB = (recipe) => {
    const {recipe_id, title, description, is_vegan, picture_url } = recipe

    return db('recipes')
    .update({title, description, is_vegan, picture_url}, ['recipe_id', 'username', 'title', 'description', 'is_vegan', 'picture_url '])
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