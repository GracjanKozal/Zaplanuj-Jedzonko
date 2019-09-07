document.addEventListener('DOMContentLoaded', function(){
    init();
    var allRecipies = [];
    (function checkUserName() { //IIFE
        var user_Name = document.getElementById('userName');
        if (localStorage.getItem('userName')) user_Name.innerText = localStorage.getItem('userName');
    })();

    (function switchSections() {
        var swingBtn = document.getElementById('go-to-recipes');
        var newRecipeSection = document.getElementById('new-recipe');
        var allRecipesSection = document.getElementById('all-recipes');
        var addRecipe = document.getElementById('add-recipe');
        addRecipe.addEventListener('click', function () {
           newRecipeSection.classList.remove('not-visible');
           allRecipesSection.classList.add('not-visible');
        });
        swingBtn.addEventListener('click', function () {
            newRecipeSection.classList.toggle('not-visible');
            allRecipesSection.classList.toggle('not-visible');
            renderAllRecipes();
        })
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
                if(instruccionsDescription.value) {
                    var newInstruccion = document.createElement('li');
                    newInstruccion.innerHTML = `${instruccionsDescription.value} <i class="far fa-edit" style="color: #FFB03B"></i> 
                <i class="fas fa-trash-alt" style="color: #BD4932"></i>`;
                    instruccionList.appendChild(newInstruccion);
                    instruccionsDescription.value = '';
                    var deleteBtn = newInstruccion.querySelector('.fa-trash-alt');
                    deleteBtn.addEventListener("click", function () {
                        deleteBtn.parentElement.parentElement.removeChild(newInstruccion);
                    });
                    var editBtn = newInstruccion.querySelector('.fa-edit');
                    editBtn.addEventListener('click', function () {
                       editBtn.parentElement.contentEditable = true;
                    });
                }
            });
            addIngredients.addEventListener('click', function () {
                if(ingredients.value) {
                    var newIngredient = document.createElement('li');
                    newIngredient.innerHTML = `${ingredients.value} <i class="far fa-edit" style="color: #FFB03B"></i> 
               <i class="fas fa-trash-alt" style="color: #BD4932"></i>`;
                    ingredientsList.appendChild(newIngredient);
                    ingredients.value= '';
                    var deleteBtn = newIngredient.querySelector('.fa-trash-alt');
                    deleteBtn.addEventListener("click", function () {
                        deleteBtn.parentElement.parentElement.removeChild(newIngredient);
                    });
                    var editBtn = newIngredient.querySelector('.fa-edit');
                    editBtn.addEventListener('click', function () {
                        editBtn.parentElement.contentEditable = true;
                    });
                }
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
                    addRecipesToLocalStorage(newRecipe);
                    allInstruccions.forEach(function (element) {
                        instruccionList.removeChild(element)
                    });
                    allIngredients.forEach(function (element) {
                       ingredientsList.removeChild(element);
                    });
                } else {
                    alert('Dodaj nazwę i opis przepisu, resztę możesz dodać później :-)!!')
                }
            }
            saveBtn.addEventListener('click', addRecipe);
        };
        return elementsEvents();
    }
    function addRecipesToLocalStorage(newRecipe) {
        var dataFromLocalStorage = [];
        if (localStorage.getItem("recipes") != null) {
            dataFromLocalStorage = JSON.parse(localStorage.getItem("recipes"));
            dataFromLocalStorage.push(newRecipe);
            localStorage.setItem("recipes", JSON.stringify(dataFromLocalStorage));
        } else {
            dataFromLocalStorage.push(newRecipe);
            localStorage.setItem("recipes", JSON.stringify(dataFromLocalStorage));
        }
        alert("Przepis zapisany do localStorage");
    }
    function renderAllRecipes() {
        var allRecipeList = document.getElementById('all-recipes-list');
        allRecipeList.innerHTML= '';
        var allRecipes = JSON.parse(localStorage.getItem("recipes"));
        allRecipes.forEach(function(singleRecipe, index) {
            var newLi = document.createElement("li");
            var instructionsOl = document.createElement('ol');
            var ingredientsOl = document.createElement("ol");
            singleRecipe.instructions.forEach(function (instruction) {
                var newRecipeLi = document.createElement("li");
                newRecipeLi.innerHTML = instruction;
                instructionsOl.appendChild(newRecipeLi);
            });
            singleRecipe.ingredients.forEach(function (ingredient) {
                var newRecipeLi = document.createElement("li");
                newRecipeLi.innerHTML = ingredient;
                ingredientsOl.appendChild(newRecipeLi);
            });
            newLi.innerHTML = `<span>${index +1}</span> <span>${singleRecipe.title}</span> 
            <span>${singleRecipe.description}</span> <span><i class="far fa-edit" data-id="${singleRecipe.id}" style="color: #FFB03B" ></i> 
            <i class="fas fa-trash-alt" style="color: #BD4932" data-id="${singleRecipe.id}"></i></span>`;
            newLi.appendChild(instructionsOl);
            newLi.appendChild(ingredientsOl);
            allRecipeList.appendChild(newLi);
            newLi.querySelector('.fa-trash-alt').addEventListener('click', deleteRecipe);
            newLi.querySelector('.fa-edit').addEventListener('click', function () {
                document.getElementById('new-recipe').classList.remove('not-visible');
                document.getElementById('all-recipes').classList.add('not-visible');
                var recipeName = document.getElementById('recipe-name-descr');
                var recipeDescription = document.getElementById('ingredients-description');
                var instruccionsDescription = document.getElementById('instructions-description');
                var instruccionList = document.getElementById('instrucion-list');
                var ingredients = document.getElementById('ingredients');
                var ingredientsList = document.getElementById('ingredients-list');
                recipeName.innerText = newLi.children[1].innerText;
                recipeDescription.innerText = newLi.children[2].innerText;
                instruccionList.innerHTML = newLi.children[4].innerHTML;
                ingredientsList.innerHTML = newLi.children[5].innerHTML;
            });
        });
    }
    function deleteRecipe() {
        var items = JSON.parse(localStorage.getItem("recipes"));
        items.splice(this.data,1);
        localStorage.setItem('recipes', JSON.stringify(items));
        window.location.reload(false);
    }
});