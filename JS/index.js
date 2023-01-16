var searchBar=document.getElementById('search-bar');
var searchBtn=document.getElementById('search-btn');
var mealsList=document.getElementById('meals-list');
var favourite_list=[];

searchBar.addEventListener('keyup',(e)=>{
    const searchString=e.target.value.toLowerCase();
    search(searchString);
})

searchBtn.addEventListener('click',()=>{
    const searchString=searchBar.value.toLowerCase();
    search(searchString);
})
const search=async (searchString)=>{
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchString}`;
    const response=await fetch(url);
    const data=await response.json();
    console.log(data.meals);
    display(data.meals);
}

const display=(meals)=>{
    let localArray=JSON.parse(localStorage.getItem('favMeals'));
   if(meals===null)
   {
    mealsList.innerHTML='<h1>No meals for search given</h1>'
   }
   else{
      const mealString=meals.map((meal)=>{
         let recipeId=meal.idMeal;
         let fav=false;
         if(localArray.indexOf(recipeId) != -1){
            fav=true;
         }
         return `<li class="meal"/>
         <img src="${meal.strMealThumb}" /img>
          <div class="meal-name" id="${meal.idMeal}" >
          <h2 class="recipe-name">${meal.strMeal}</h2>
          <i class="fa-${fav? 'solid':'regular' } fa-heart fav-btn"></i>
          </div>
          </li>
          `;
      }).join('');
      mealsList.innerHTML=mealString
   }
}


// function myFunction(){
//     var input= document.getElementById('take-input').value;
//     const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
//     getdata();
//     async function getdata(){
//         const response=await fetch(url);
    
//         const data=await response.json();

//         var output=document.getElementById('output');
//         data.meals.forEach(function(element) {
           
//             var idMeal = document.createElement('div');
//             var strMeal = document.createElement('a');
//             var favourite_button=document.createElement('button');
//             var button=document.createTextNode("add");
//             favourite_button.appendChild(button);
//             strMeal.href="./my_details.html";
//             idMeal.innerHTML = element.idMeal;
//             strMeal.innerHTML = element.strMeal;
//             favourite_button.addEventListener('click',function(){
//                 console.log("pushing");
//                 favourite_list.push(element);
//                 console.log(favourite_list);
//             })
       
//             output.appendChild(idMeal);
//             output.appendChild(strMeal);
//             output.appendChild(favourite_button);

            
           
//          });
//     }
//     console.log("input=",input);
//     favourite_list.forEach((el)=>{
//         console.log("elements",el);
//     })
// }


mealsList.addEventListener('click',(e)=>{
    console.log(e.target);
    if(e.target.className === "recipe-name"){
        let recipeId=e.target.parentNode.id;
        console.log(recipeId);
        window.open(`my_details.html?id=${recipeId}`);
    }else if(e.target.classList.contains('fav-btn')){
        let recipeId=e.target.parentNode.id;
        let localArray = JSON.parse(localStorage.getItem('favMeals'));
        if(localArray.indexOf(recipeId) != -1 ){
            localArray=localArray.filter((item)=> item != recipeId)
            localStorage.setItem('favMeals',JSON.stringify(localArray));
            e.target.classList.remove('fas');
            e.target.classList.add('far');
        }else{
            localArray.push(recipeId);
            localStorage.setItem('favMeals',JSON.stringify(localArray));
            e.target.classList.remove('far');
            e.target.classList.add('fas');
            alert('Added to Favourites')
        }
    } 
})
function createLocalstorage(){
    let localArray=[];
    if(localStorage.getItem('favMeals')===null){
        localStorage.setItem('favMeals',JSON.stringify(localArray));
    }

}
document.addEventListener('DOMContentLoaded',createLocalstorage);