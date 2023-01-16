let favMeals=JSON.parse(localStorage.getItem('favMeals'));
var favList=document.getElementById("fav-list");


const fetchData=async (mealId)=>{
    try {
        //create dynamic url
        let res=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        let result=await res.json();
        displayResults(result.meals[0]);
    } catch (error) {
        console.error(error);
    }
}

const showFavourites=()=>{

    if(favMeals.length===0){
        mealsList.innerHTML='<h1>No Favourite Meals Present</h1>'
    }else{
        
        favMeals.map((mealId)=>{
            fetchData(mealId);
        })
    }
}

const displayResults=(meal)=>{
    let fav=true;
    //create dynamic li 
    favList.innerHTML +=`<li class="meal">
    <img src="${meal.strMealThumb}" /img>
     <div class="meal-name" id="${meal.idMeal}">
     <h2 class="recipe-name">${meal.strMeal}</h2> 
     <i class="fa-${ fav ? 'solid' : 'regular' }fa-heart fav-btn"></i>
     </div>
     </li>`;
}


showFavourites();