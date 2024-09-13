//1
const searchBtn = document.querySelector(".searchBtn");
const searchBox = document.querySelector(".searchBox");
const recipeContainer = document.querySelector(".recipeContainer");
const recipeDetailsContent = document.querySelector(".recipeDetailsContent");
const recipeCloseBtn = document.querySelector(".recipeCloseBtn");

//3
const fetchRecipes= async(query)=>{
    recipeContainer.innerHTML="<h2>Fetching Recipes......</h2>"
    //9 try catch block 
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        const response= await data.json();
        //4
        recipeContainer.innerHTML=""
        response.meals.forEach(meal => {
        console.log(meal)
        const recipeDiv=document.createElement('div')
        recipeDiv.classList.add("recipe")
        recipeDiv.innerHTML=`<img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to ${meal.strCategory} Category</p>
        `
        const button =document.createElement("button")
        //5.Adding add event listner to recipe button
        button.addEventListener('click',()=>{
            
            openRecipePopup(meal);
            
        })
        button.textContent="View Recipe"
        recipeDiv.appendChild(button)
        recipeContainer.appendChild(recipeDiv)

    });
    } 
    catch (error) {
        recipeContainer.innerHTML=`<h2 class="notFound" >Sorry we do not have your '${query}' recipe ! <img src='./img/pngwing.com.png'/></h2>`
        
    }
    // console.log(response.meals[0])
}

//7 function to fetch ingredients and measurements
const fetchIngredients=(meal)=>{
    let ingredientList="";
            for(let i=1;i<=20;i++){
                const ingredient =meal[`strIngredient${i}`]
                if(ingredient){
                    const measure=meal[`strMeasure${i}`];
                    ingredientList+=`<li>${measure} ${ingredient}</li>`
                }else {
                    break
                }
            }
            return ingredientList;
}



//6
const openRecipePopup=(meal)=>{
    recipeDetailsContent.innerHTML=`
        <h2 class="recipeName" >${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="IngredientList"> ${fetchIngredients(meal)}</ul>
              <div class="Instructions">
                  <h3>Instruction</h3>
                  <p>${meal.strInstructions}</p>
              </div>`
        recipeDetailsContent.parentElement.style.display="block";
}



//8
recipeCloseBtn.addEventListener("click",()=>{
    recipeDetailsContent.parentElement.style.display="none"
})

//2
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`<h2 class="notTyped">Please type the meal in the search bar ! <img src='./img/pngwingAngry.png'/> </h2>`
        return
    }
    fetchRecipes(searchInput);
})