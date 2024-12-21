const user = JSON.parse(localStorage.getItem("user"));
const { username, user_id, first_name } = user;

const usernameRecipe = document.getElementById("usernameFavorites");
usernameRecipe.textContent = `${first_name}'s favorites`;

let favRecipes = [];

async function getUserFavorites() {
  try {
    const response = await fetch(`http://localhost:3000/favorite/${username}`);
    if (response.ok) {
      favRecipes = await response.json();
      renderRecipes(favRecipes);

      const searchInput = document.getElementById("search");
      searchInput.addEventListener("input", (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredRecipes = favRecipes.filter((recipe) => {
          const inTitle = recipe.title.toLowerCase().includes(searchTerm);
          const inIngredients = recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(searchTerm)
          );
          return inTitle || inIngredients;
        });
        renderRecipes(filteredRecipes);
      });
    }
  } catch (error) {
    console.log(error);
  }
}
getUserFavorites();

function renderRecipes(arr) {
  const recipeSection = document.getElementById("allfavorites");
  recipeSection.innerHTML = ""; // Clear existing content

  arr.forEach((recipe) => {
    const div = document.createElement("div");
    div.setAttribute("data-recipe-id", recipe.recipe_id);
    div.className = "onerecipe";
    div.innerHTML = `<img src="${recipe.picture_url}" alt="picture">
              <p>${recipe.title} by ${recipe.username}</p>
              <a href="recipe.html?id=${recipe.recipe_id}">Link to the recipe</a>
              <span class="like-heart" data-liked="true">❤️</span>`;
    recipeSection.appendChild(div);

    if (recipe.is_vegan) {
      const vegan = document.createElement("p");
      vegan.textContent = "🌱 Vegan";
      div.appendChild(vegan);
    }

    const heart = div.querySelector(".like-heart");
    heart.addEventListener("click", () => {
      const recipeId = div.getAttribute("data-recipe-id");
      const username = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).username
        : null;
      const isLiked = heart.getAttribute("data-liked") === "true";

      if (username) {
        if (isLiked) {
          removeFavorite(username, recipeId);
          location.reload();
        } else {
          addFavorite(username, recipeId);
          location.reload();
        }

        heart.setAttribute("data-liked", !isLiked);
        heart.classList.toggle("liked");
      }
    });
  });
}

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

async function removeFavorite(username, recipe_id) {
  try {
    const response = await fetch(
      `http://localhost:3000/favorite/remove/${username}/${recipe_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          recipe_id: recipe_id,
        }),
      }
    );
    if (response.ok) {
      console.log("Recipe removed from favorites");
    } else {
      console.log("Failed to remove recipe from favorites");
    }
  } catch (error) {
    console.log("Error removing favorite:", error);
  }
}
