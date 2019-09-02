document.addEventListener('DOMContentLoaded', function(){
	//Karolina code
	(function setDataLocalStorage() {
		// i put this code in function, to protect to be overwritten,  and immediately invoked the function.
		var nameForm = document.querySelector(".form");
		var nameInput = document.querySelector("#name");
		var user_Name= document.getElementById('userName');
		nameForm.addEventListener("submit", function(e) {
			e.preventDefault();

			var name = nameInput.value;
			if (name.trim()) {
				localStorage.setItem("userName", name);
				nameInput.value = "";
				user_Name.innerText = localStorage.getItem('userName');
			} else {
				alert("🍓🍌🍇 Podaj nam swoje imię 🥦🌶🥒");
			}
		});
		if (localStorage.getItem('userName')) user_Name.innerText = localStorage.getItem('userName');
		//this line allows to display user name after the next visit on website
	})();
});
