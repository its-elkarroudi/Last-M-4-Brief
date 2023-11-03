// BURGER MENU 
const burger_Btn = document.querySelector('#Burger_Menu');
const burger_ul = document.querySelector('header .head-2 .navbar ul');

burger_Btn.addEventListener('click', () => {
    burger_ul.classList.toggle('active_Menu');
    })

// SUBSCRIBE VALIDATION 
const subscribeInput = document.querySelector('input[name="Subscribe-Email"]');
const subscribeForm = document.querySelector('#subscribeForm');
const subscribe_error_message = document.querySelector('footer .errorMessage');

let is_form_valid = false;

const formValidate = () => {

    if (!subscribeInput.value) {
        is_form_valid = false; 
        subscribeInput.classList.add('invalid');
        subscribe_error_message.innerText = "Message empty";
    }
    else {
        is_form_valid = true;
        subscribeInput.classList.remove('invalid');
        subscribeInput.classList.add('valid');
        subscribe_error_message.innerText = "";
    }
}

subscribeInput.addEventListener('input', () => {
    formValidate();
})

subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidate();
})

// ============================================================= 
document.addEventListener("DOMContentLoaded", function () {
    const categoryContainer = document.querySelector(".categories-container");
    const categoryWidth = categoryContainer.querySelector(".category").offsetWidth;
    let currentIndex = 0;

    const nextButton = document.querySelector(".next-button");
    const prevButton = document.querySelector(".prev-button");

nextButton.addEventListener("click", function () {
    if (currentIndex < categoryContainer.children.length - 1) {
        currentIndex++;
        updateCarousel();
    } else {
        currentIndex = 0; 
        updateCarousel();
    }
});

prevButton.addEventListener("click", function () {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    } else {
        currentIndex = categoryContainer.children.length - 1; 
        updateCarousel();
    }
});


    function updateCarousel() {
        const translateX = -currentIndex * categoryWidth;
        categoryContainer.style.transform = `translateX(${translateX}px)`;
    }
});