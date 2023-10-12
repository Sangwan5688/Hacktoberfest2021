const recipes = [
    { name: 'Spaghetti Bolognese', ingredients: 'Pasta, Ground Beef, Tomato Sauce, Onion, Garlic, Italian Seasoning' },
    { name: 'Chicken Stir Fry', ingredients: 'Chicken, Broccoli, Carrots, Soy Sauce, Ginger, Garlic' },
    { name: 'Vegetarian Pizza', ingredients: 'Pizza Dough, Tomato Sauce, Mozzarella Cheese, Bell Peppers, Olives, Mushrooms' }
];

function showRecipes() {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '<h3>Recipes</h3>';

    for (const recipe of recipes) {
        const recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe-item');
        recipeItem.innerHTML = `<p><a href="#" onclick="showRecipeDetails('${recipe.name}')">${recipe.name}</a></p>`;
        recipeList.appendChild(recipeItem);
    }
}

function showRecipeDetails(recipeName) {
    const recipeDetails = document.getElementById('recipeDetails');
    const selectedRecipe = recipes.find(recipe => recipe.name === recipeName);

    if (selectedRecipe) {
        recipeDetails.innerHTML = `
            <h3>${selectedRecipe.name}</h3>
            <p>Ingredients: ${selectedRecipe.ingredients}</p>
        `;
    }
}

function showAddRecipeForm() {
    const addRecipeForm = document.getElementById('addRecipeForm');
    addRecipeForm.style.display = 'block';
}

function addRecipe() {
    const recipeName = document.getElementById('recipeName').value;
    const recipeIngredients = document.getElementById('recipeIngredients').value;

    if (recipeName && recipeIngredients) {
        recipes.push({ name: recipeName, ingredients: recipeIngredients });
        showRecipes();
        resetAddRecipeForm();
    }
}

function resetAddRecipeForm() {
    document.getElementById('recipeName').value = '';
    document.getElementById('recipeIngredients').value = '';
    document.getElementById('addRecipeForm').style.display = 'none';
}

showRecipes();
