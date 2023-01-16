let  query=window.location.search;
let queryParams=new URLSearchParams(query);
let recipeId=queryParams.get('id');

const getDetails=async (recipeId)=>{
   const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
 
   const res=await fetch(url);
   const data=await res.json();
   showDetails(data);
}

const showDetails=((meal)=>{
    const photo=document.getElementById("pic");
    photo.innerHTML=`<img src=${meal.meals[0].strMealThumb}>`;
    const name=document.getElementById("name");
    name.innerText="Name : "+meal.meals[0].strMeal;
    const category=document.getElementById('category');
    category.innerText="Category : "+ meal.meals[0].strCategory;
})

getDetails(recipeId);