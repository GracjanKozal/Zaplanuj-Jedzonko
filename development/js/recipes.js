document.addEventListener('DOMContentLoaded', function(){
    (function checkUserName() {
        var user_Name = document.getElementById('userName');
        if (localStorage.getItem('userName')) user_Name.innerText = localStorage.getItem('userName');
    })();
});