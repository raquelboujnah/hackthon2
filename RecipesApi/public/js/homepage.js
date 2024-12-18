async function getAllRecipes() {
    try {
        const response = await fetch ('http://localhost:3000/recipes')
        const data = await response.json()
        renderRecipes(data)
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
getAllRecipes()

function renderRecipes(arr){
    const recipeSection = document.getElementById('allrecipes')
    arr.forEach(recipe => {
        const div = document.createElement ('div')
        div.setAttribute('data-recipe-id', recipe.recipe_id)
        div.className = 'onerecipe'
        div.innerHTML = `<img src="${recipe.picture_url}" alt="picture">
          <p>${recipe.title} by ${recipe.username}</p>
          <a href="recipe.html?id=${recipe.recipe_id}">Link to the recipe</a>
          <button>Like</button>`
        
        recipeSection.appendChild(div)

        if(recipe.is_vegan){
            const vegan = document.createElement('p')
            vegan.textContent = 'Vegan'
            div.appendChild(vegan)
        }
    })
}



