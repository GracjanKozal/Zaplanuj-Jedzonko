var nameForm = document.querySelector(".form");
var nameInput = document.querySelector("#name");

nameForm.addEventListener("submit", function(e) {
	e.preventDefault();

	var name = nameInput.value;
	if (name.trim()) {
		localStorage.setItem("userName", name);
		nameInput.value = "";
	} else {
		alert("🍓🍌🍇 Podaj nam swoje imię 🥦🌶🥒");
	}
});
