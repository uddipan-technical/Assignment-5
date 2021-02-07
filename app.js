
    const inputFirstLetter = () => {
    const input = document.getElementById("searchItem").value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayResult(data.meals));
    document.getElementById("searchItem").value = "";
}
    const displayResult = meals => {
    const mealsDiv = document.getElementById("mealList");
    meals.forEach( meal => {
        const mealDiv = document.createElement("div");
        mealDiv.className = 'myMealsDiv';

        const mealInfo = `
        <div onclick = "mealIngredient('${meal.strMeal}')">
        <img src = "${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        </div>
        `
        mealDiv.innerHTML = mealInfo;
        mealsDiv.appendChild(mealDiv);
    });
}
const mealIngredient = mealIngredientName => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealIngredientName}`;
    fetch(url)
    .then(res => res.json())

     .then(data => mealsIngredientDetails(data.meals[0]));
 }
const mealsIngredientDetails = meals => {
    const ingredientDiv =document.getElementById('IngredientDiv');
    ingredientDiv.innerHTML = `
       <div class="meal-details">
        <img src = "${meals.strMealThumb}">
        <h3>${meals.strMeal}</h3>
        <h4>Ingredients</h4>
        <p>${meals.strIngredient1}</p>
        <p>${meals.strIngredient2}</p>
        <p>${meals.strIngredient3}</p>
        <p>${meals.strIngredient4}</p>
        <p>${meals.strIngredient5}</p>
        <p>${meals.strIngredient6}</p>
        <p>${meals.strIngredient7}</p>
        <p>${meals.strIngredient8}</p>
        <p>${meals.strIngredient9}</p>
        <p>${meals.strIngredient10}</p>
        </div>
    `
}
 