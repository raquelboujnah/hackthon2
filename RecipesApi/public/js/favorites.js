const heart = document.querySelector('.like-heart');
heart.addEventListener('click', async () => {
  const recipe_id = // Récupérer l'ID de la recette depuis l'élément parent ou une donnée liée
  const username = // Récupérer le nom d'utilisateur de l'utilisateur connecté

  try {
    const response = await fetch('/api/favorite/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, recipe_id }),
    });

    const result = await response.json();
    if (response.ok) {
      console.log(result.message);
    } else {
      console.error('Error:', result.message);
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
});