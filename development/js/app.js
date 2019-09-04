document.addEventListener('DOMContentLoaded', function(){
	checkUser(); // I used hoisting and invoked function here.MG
	//K.P code
	(function setDataLocalStorage() {
		// i put this code in function, to protect to be overwritten,  and immediately invoked the function after declaration.
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
			document.location.reload(true);
		});
		if (localStorage.getItem('userName')) user_Name.innerText = localStorage.getItem('userName');
		//this line allows to display user name after the next visit on website
	})();
	//welcome message display check function. MG code
	function checkUser() {
		var welcomeMessage = document.getElementById('welcome-message');
		var appPanel = document.getElementById('app-Panel');

		if(!localStorage.getItem('userName')) {
			welcomeMessage.classList.toggle('visible');
		} else {
			appPanel.classList.toggle('visible');
		}
	}
});
