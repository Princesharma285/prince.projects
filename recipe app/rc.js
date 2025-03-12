const searchBox = document.querySelector('.search-box');
const searchBtn = document.querySelector('.searchbtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeContent = document.querySelector('.recipe-detail-content');
const recipeCloseBtn = document.querySelector('.recipeclosebutton');

// Fetch Recipes (General or by Search)
const fetchRecipes = async (query = "chicken") => {
    recipeContainer.innerHTML = "<h2>Fetching recipes...</h2>";

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();

        if (data.meals) {
            recipeContainer.innerHTML = "";
            data.meals.slice(0, 6).forEach(meal => {  // Show only 6 meals by default
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe');
                recipeDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                    <p><strong>${meal.strArea}</strong> Dish</p>
                    <p>Category: <strong>${meal.strCategory}</strong></p>
                    <button class="view-btn">View Recipe</button>
                `;

                recipeDiv.querySelector('.view-btn').addEventListener("click", () => openRecipePopup(meal));
                recipeContainer.appendChild(recipeDiv);
            });
        } else {
            recipeContainer.innerHTML = "<p>No recipes found.</p>";
        }
    } catch (error) {
        recipeContainer.innerHTML = "<p>Something went wrong. Try again later.</p>";
    }
};

// Fetch Ingredients
const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredientsList += `<li>${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }
    return ingredientsList;
};

// Open Recipe Popup
const openRecipePopup = (meal) => {
    recipeContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <h3>Ingredients</h3>
        <ul>${fetchIngredients(meal)}</ul>
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
    `;
    document.querySelector('.recipedetails').style.display = "block";
};

// Close Recipe Popup
recipeCloseBtn.addEventListener('click', () => {
    document.querySelector('.recipedetails').style.display = "none";
});

// Search Event
searchBtn.addEventListener('click', () => {
    if (searchBox.value.trim()) {
        fetchRecipes(searchBox.value.trim());
    } else {
        alert("Please enter a search term!");
    }
});

// Load Default Recipes on Page Load
document.addEventListener("DOMContentLoaded", () => {
    fetchRecipes();  // Fetch default recipes (e.g., chicken recipes)
});
