document.addEventListener('DOMContentLoaded', function(){
    (function slider() {
        var lefArrow = document.getElementById('left-Arrow');
        var rightArrow = document.getElementById('right-Arrow');
        var slides = document.querySelectorAll('.slides');
        var slidesCounter = 0;
        var firstSlide = slides[0];
        firstSlide.classList.add('slide-visible');
        rightArrow.addEventListener('click', function () {
            slides[slidesCounter].classList.toggle('slide-visible');
            if(slidesCounter === slides.length-1) {
                slidesCounter = 0;
            } else {
                slidesCounter++;
            }
            slides[slidesCounter].classList.toggle('slide-visible');
        });
        lefArrow.addEventListener('click', function () {
            slides[slidesCounter].classList.toggle('slide-visible');
            if (slidesCounter === 0) {
                slidesCounter = slides.length -1;
            } else {
                slidesCounter--;
            }
            slides[slidesCounter].classList.toggle('slide-visible');
        });
    })();
});