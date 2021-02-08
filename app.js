        
          // Please checked in Crome.

        const search = document.getElementById("search");
        const submit = document.getElementById("meal-submit");
        const mealsElement = document.getElementById("mealTotal");
        function searchMealItem(mealItem) {
          mealItem.preventDefault();
          singleMealElement.innerHTML = "";
          const searchItem = search.value;
          console.log(searchItem);
          if (searchItem.trim()) {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`)
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                mealItemHeading.innerHTML = `<h2>Search results for '${searchItem}':</h2>`;
                if (data.mealTotal === null) {
                  mealItemHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
                } else {
                  mealsElement.innerHTML = data.meals
                    .map(
                      (meal) => `
                    <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="mealDetails" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3></div>
                    </div>`
                    )
                    .join("");
                }
              });
            search.value = "";
          } else {
            alert("Please enter a search term");
          }
          const mealItemHeading = document.getElementById("result-heading");
        };
        const singleMealElement = document.getElementById("singleMeal");

        submit.addEventListener("submit", searchMealItem);
          function getMealId(mealID) {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
              .then((res) => res.json())
              .then((data) => {
                const meal = data.meals[0];
                addMealToDOM(meal);
              });
          };

          function addMealToDOM(meal) {
            const mealItemIngredients = [];
            for (let i = 1; i <= 20; i++) {
              if (meal[`strIngredient${i}`]) {
                mealItemIngredients.push(
                  `${meal[`strIngredient${i}`]}-${meal[`strMeasure${i}`]}`
                );
              } else {
                break;
              }
            };

            singleMealElement.innerHTML = `
            <div class="single-mealItem">
              <h1>${meal.strMeal}</h1>
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
              <div class="single-meal-info">
                  ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
                  ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
              </div>
              <div class="main">
                  <p>${meal.strInstructions}</p>
                  <h2>Ingredients</h2>
                  <ul>
                      ${mealItemIngredients.map((ing) => `<li>${ing}</li>`).join("")}
                  </ul>
              </div>
            </div>`;
          };
          
          mealsElement.addEventListener("click", (mealItem) => {
            const mealDetails = mealItem.path.find((item) => {
              if (item.classList) {
                return item.classList.contains("mealDetails");
              } else {
                return false;
              }
            });
            if (mealDetails) {
              const mealID = mealDetails.getAttribute("data-mealid");
              getMealId(mealID);
            }
          });
       
