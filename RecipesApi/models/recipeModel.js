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

    return db('recipes').insert(
        {
            username,
            title,
            description: JSON.stringify(description), // Convert array to JSON string
            is_vegan,
            picture_url,
            ingredients: JSON.stringify(ingredients), // Convert array to JSON string
        },
        ['recipe_id', 'username', 'title', 'description', 'is_vegan', 'picture_url', 'ingredients']
    );

}

const updateRecipeDB = (recipe) => {
    const {recipe_id, title, description, is_vegan, picture_url, ingredients } = recipe

    return db('recipes')
    .update(
        {
            title, 
            description : JSON.stringify(description),
            is_vegan,
            picture_url, 
            ingredients : JSON.stringify(ingredients)
        }, 
            ['recipe_id', 'username', 'title', 'description', 'is_vegan', 'picture_url ', 'ingredients'])
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