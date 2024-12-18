const params = new URLSearchParams(window.location.search);
const recipeId = params.get('id');

const getTheRecipe = async()=>{
    try {
        const response = await fetch(`http://localhost:3000/recipes/recipe/${recipeId}`)
        const data = await response.json()
        displayRecipe(data[0])
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

function displayRecipe (recipe) {
    const recipeSection = document.getElementById('recipe')
    recipeSection.innerHTML = `
    <h1>${recipe.title}</h1>
        <img src="${recipe.picture_url}" alt="${recipe.title}">
        <h3>Ingredients:</h3>
        <ul id="ingredients-list"></ul>
        <h3>Instructions:</h3>
        <ol id="instructions-list"></ol>
        `
    
    const ingredientsList = document.getElementById('ingredients-list');
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);

    });

    const instructionsList = document.getElementById('instructions-list');
    recipe.description.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        instructionsList.appendChild(li);
    });
}

getTheRecipe()