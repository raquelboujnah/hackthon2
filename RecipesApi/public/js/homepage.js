document.addEventListener("DOMContentLoaded", () => {
  const userData = localStorage.getItem("user");

  if (!userData) {
    window.location.href = "/login.html";
  } else {
    const user = JSON.parse(userData);

    const welcomeMessage = document.getElementById("welcome-message");
    welcomeMessage.textContent = `Welcome, ${user.username}!`;
  }
});

const logoutButton = document.getElementById("logout-btn");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/login.html";
});

async function getAllRecipes() {
  try {
    const response = await fetch("http://localhost:3000/recipes");
    const data = await response.json();
    renderRecipes(data);

    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", (event) => {
      const searchTerm = event.target.value.toLowerCase();
      const filteredRecipes = data.filter((recipe) => {
        const inTitle = recipe.title.toLowerCase().includes(searchTerm);
        const inIngredients = recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(searchTerm)
        );
        const inUsername = recipe.username.toLowerCase().includes(searchTerm);
        return inTitle || inIngredients || inUsername;
      });
      renderRecipes(filteredRecipes);
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
getAllRecipes();

function renderRecipes(arr) {
  const recipeSection = document.getElementById("allrecipes");
  recipeSection.innerHTML = "";
  arr.forEach((recipe) => {
    const div = document.createElement("div");
    div.setAttribute("data-recipe-id", recipe.recipe_id);
    div.className = "onerecipe";
    div.innerHTML = `<img src="${recipe.picture_url}" alt="picture">
          <p>${recipe.title} by ${recipe.username}</p>
          <a href="recipe.html?id=${recipe.recipe_id}">Link to the recipe</a>
          <span class="like-heart" data-liked="false">&#9825;</span>
          `;

    recipeSection.appendChild(div);

    if (recipe.is_vegan) {
      const vegan = document.createElement("p");
      vegan.textContent = "Vegan";
      div.appendChild(vegan);
    }

    const heart = div.querySelector(".like-heart");
    heart.addEventListener("click", () => {
      const recipeId = div.getAttribute("data-recipe-id");
      const username = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).username
        : null;
      const isLiked = heart.getAttribute("data-liked") === "true";
      console.log("isliked", isLiked);
      if (username) {
        if (isLiked) {
          removeFavorite(username, recipeId);
        } else {
          addFavorite(username, recipeId);
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
