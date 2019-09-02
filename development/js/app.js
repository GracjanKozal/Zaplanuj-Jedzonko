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
