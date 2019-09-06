document.addEventListener('DOMContentLoaded', function(){
    init();
    var allRecipies = [];
    (function checkUserName() { //IIFE
        var user_Name = document.getElementById('userName');
        if (localStorage.getItem('userName')) user_Name.innerText = localStorage.getItem('userName');
    })();

    function Recipe(id, title, description) {//object constructor
        this.id = id; // id przepisu
        this.title = title; // nazwa przepisu
        this.description = description; // opis przepisu
        this.ingredients = []; // składniki przepisu
        this.instructions = []; // instrukcje przepisu
    }

    function init () { //closures
        var recipeName = document.getElementById('recipe-name-descr');
        var recipeDescription = document.getElementById('ingredients-description');
        var instruccionsDescription = document.getElementById('instructions-description');
        var addInstruccion = document.getElementById('add-instruction');
        var instruccionList = document.getElementById('instrucion-list');
        var ingredients = document.getElementById('ingredients');
        var addIngredients = document.getElementById('add-ingredients');
        var ingredientsList = document.getElementById('ingredients-list');
        var saveBtn = document.getElementById('save');
        var elementsEvents = function () {
            var recipesCounter = 1;
            addInstruccion.addEventListener('click', function () {
                var newInstruccion = document.createElement('li');
                newInstruccion.innerHTML = `${instruccionsDescription.value} <i class="far fa-edit" style="color: #BD4932"></i> 
                <i class="fas fa-trash-alt" style="color: #FFB03B"></i>`;
                instruccionList.appendChild(newInstruccion);
                instruccionsDescription.value = '';
            });
            addIngredients.addEventListener('click', function () {
               var newIngredient = document.createElement('li');
               newIngredient.innerHTML = `${ingredients.value} <i class="far fa-edit" style="color: #BD4932"></i> 
               <i class="fas fa-trash-alt" style="color: #FFB03B"></i>`;
               ingredientsList.appendChild(newIngredient);
               ingredients.value= '';
            });
            function addRecipe(e) {
                e.preventDefault();
                if (recipeName.value && recipeDescription.value) {
                    var newRecipe = new Recipe(recipesCounter, recipeName.value, recipeDescription.value);
                    var allInstruccions = instruccionList.querySelectorAll('li');
                    var allIngredients = ingredientsList.querySelectorAll('li');
                    allInstruccions.forEach(function (element) {
                        newRecipe.instructions.push(element.innerText);
                    });
                    allIngredients.forEach(function (element) {
                        newRecipe.ingredients.push(element.innerText);
                    });
                    recipesCounter++;
                    allRecipies.push(newRecipe);
                    console.log(newRecipe);
                    recipeName.value = '';
                    recipeDescription.value = '';
                    addRecipesToLocalStorage();
                    allInstruccions.forEach(function (element) {
                        instruccionList.removeChild(element)
                    });
                    allIngredients.forEach(function (element) {
                       ingredientsList.removeChild(element);
                    });
                } else {
                    alert('Wypełnij wszystkie pola :-)!!')
                }
            }
            saveBtn.addEventListener('click', addRecipe);
        };
        elementsEvents();
    }
    function addRecipesToLocalStorage() {
        localStorage.setItem('recipesAray', allRecipies);
    }
});