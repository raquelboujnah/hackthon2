document.addEventListener("DOMContentLoaded", () => {
  fetch("./navbar.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("navbar-container").innerHTML = html;

      // Ajouter ici les éventuels scripts spécifiques au fonctionnement de la navbar
      const logoutButton = document.getElementById("logout-btn");
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.href = "/login.html";
      });
    })
    .catch((error) => console.error("Error loading navbar:", error));
});
