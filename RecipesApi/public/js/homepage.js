const user = JSON.parse(localStorage.getItem('user'));
const { username } = user;

let categoriesData = [];
let recipeCategoriesData = [];
let allRecipes = [];
let favRecipes = [];

// Fetch categories for all recipes when the page loads
const preloadCategories = async () => {
  try {
    const response = await fetch('http://localhost:3000/recipes/all/categories'); 
    categoriesData = await response.json();
  } catch (error) {
    console.error("Failed to fetch categories", error);
  }

  try {
    const response = await fetch('http://localhost:3000/recipes/api/categories'); 
    recipeCategoriesData = await response.json();
  } catch (error) {
    console.error("Failed to fetch categories", error);
  }


};


document.addEventListener("DOMContentLoaded", () => {
  const userData = localStorage.getItem("user");
  preloadCategories();

  // Check if user is logged in
  if (!userData) {
    window.location.href = "/login.html";
  } else {
    const user = JSON.parse(userData);
    const welcomeMessage = document.getElementById("welcome-message");
    welcomeMessage.textContent = `Welcome, ${user.username}!`;
  }

  // Fetch recipes after checking user login
  getAllRecipes();
});

const logoutButton = document.getElementById("logout-btn");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/login.html";
});


const handleSearchInput = (event) => {
  const searchTerm = event.target.value.toLowerCase();

  const filteredRecipes = allRecipes.filter((recipe) => {
    const inTitle = recipe.title.toLowerCase().includes(searchTerm);
    const inIngredients = recipe.ingredients.some((ingredient) =>
      ingredient.toLowerCase().includes(searchTerm)
    );
    const inUsername = recipe.username.toLowerCase().includes(searchTerm);

    // Filter and map categories for the recipe
    const recipeCategoryMappings = recipeCategoriesData.filter((rc) => {
      return rc.recipe_id === recipe.recipe_id;
    });

    const linkedCategories = recipeCategoryMappings.map((rc) => {
      const category = categoriesData.find((cat) => cat.category_id === rc.category_id);
      return category ? category.name : null;
    }).filter(Boolean); // Remove null values

    // Check if any linked category matches the search term
    const inCategorie = linkedCategories.some((category) =>
      category.toLowerCase().includes(searchTerm)
    );

    return inTitle || inIngredients || inUsername || inCategorie;
  });

  renderRecipes(filteredRecipes, favRecipes);
};

// Function to fetch all recipes and favorites
async function getAllRecipes() {
  try {
    const response = await fetch("http://localhost:3000/recipes");
    allRecipes = await response.json();

    // Fetch favorite recipes after loading all recipes
    favRecipes = await getFavoriteRecipes(username);

    renderRecipes(allRecipes, favRecipes);

    // Attach search input listener (separate from fetching)
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", handleSearchInput);

  } catch (error) {
    console.log("Error fetching recipes:", error);
  }
}

// Fetch favorite recipes for the logged-in user
async function getFavoriteRecipes(username) {
  try {
    const response = await fetch(`http://localhost:3000/favorite/${username}`);
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.log("Error fetching favorite recipes:", error);
    return [];
  }
}

// Function to render recipes with heart icon for favorites
async function renderRecipes(arr, favRecipes) {
  const recipeSection = document.getElementById("allrecipes");
  recipeSection.innerHTML = "";

  arr.forEach((recipe) => {
    const div = document.createElement("div");
    div.setAttribute("data-recipe-id", recipe.recipe_id);
    div.className = "onerecipe";
    div.innerHTML = `
      <img src="${recipe.picture_url}" alt="picture">
      <p>${recipe.title} by ${recipe.username}</p>
      <a href="recipe.html?id=${recipe.recipe_id}">Link to the recipe</a><br>
    `;

    const categorieUl = document.createElement('ul')
    const categories = getCategoriesbyRecipeID(recipe.recipe_id)
    .then(categorieArr => {
      categorieArr.forEach(categorie => {
        const li = document.createElement('li')
        li.textContent = `${categorie.name}` 
        categorieUl.appendChild(li)
      })
      
    })
    div.appendChild(categorieUl)

    // Add vegan label if applicable
    if (recipe.is_vegan) {
      const vegan = document.createElement("p");
      vegan.textContent = "🌱 Vegan";
      div.appendChild(vegan);
    }

    // Check if the recipe is a favorite
    const isFavorite = favRecipes.some((favRecipe) => favRecipe.recipe_id == recipe.recipe_id);
    const heart = document.createElement("span");
    heart.className = 'like-heart';
    heart.setAttribute('data-liked', isFavorite ? 'true' : 'false');
    heart.textContent = isFavorite ? '❤️' : '♡';
    div.appendChild(heart);

    recipeSection.appendChild(div);

    // Add event listener to heart icon
    heart.addEventListener("click", () => {
      const recipeId = div.getAttribute("data-recipe-id");
      const isLiked = heart.getAttribute("data-liked") === "true";

      if (isLiked) {
        removeFavorite(username, recipeId);
      } else {
        addFavorite(username, recipeId);
      }

      // Toggle the heart icon
      heart.setAttribute("data-liked", !isLiked);
      heart.textContent = isLiked ? '♡' : '❤️';
    });
  });
}

// Function to add a recipe to favorites
async function addFavorite(username, recipe_id) {
  try {
    const response = await fetch("http://localhost:3000/favorite/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        recipe_id: recipe_id,
      }),
    });
    if (response.ok) {
      console.log("Recipe added to favorites");
    }
  } catch (error) {
    console.log("Error adding favorite:", error);
  }
}

// Function to remove a recipe from favorites
async function removeFavorite(username, recipe_id) {
  try {
    const response = await fetch(`http://localhost:3000/favorite/remove/${username}/${recipe_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("Recipe removed from favorites");
    } else {
      console.log("Failed to remove recipe from favorites");
    }
  } catch (error) {
    console.log("Error removing favorite:", error);
  }
}

async function getCategoriesbyRecipeID (id){
  try {
    const response = await fetch (`http://localhost:3000/recipes/all/categories/${id}`)
    if(response.ok){
      const categories = await response.json()
      return categories
    }else {
      return {message : 'Error during the getCategorie'}
    }
  } catch (error) {
    console.log(error)
  }
}




