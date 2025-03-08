import { $ } from "../../main";

const search = $("#search");
const searchButton = $(".header__search--btn");

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    search.classList.toggle("active");
});

const headerCartPrice = $(".header__cart--count");

function updateCart() {
    if (headerCartPrice) {
        const cartPrice = JSON.parse(localStorage.getItem("cart")) || [];

        if (!cartPrice.length) {
            headerCartPrice.innerHTML = "$0";
        } else {
            let priceCount = cartPrice.reduce((total, cart) => {
                return total + cart.quantity * cart.price;
            }, 0);

            headerCartPrice.innerHTML = "$" + priceCount.toLocaleString();
        }
    }
}

updateCart();

// click cart open model

const cartIconBtn = $(".header__cart");
const backDrop = $(".modal__backdrop");

cartIconBtn.onclick = (e) => {
    backDrop.classList.add("active");

    backDrop.onclick = (e) => {
        const backDropElement = e.target.closest(".modal__backdrop");

        if (backDropElement) {
            backDrop.classList.remove("active");
        }
    };
};

document.onkeydown = (e) => {
    if (e.key === "Escape") {
        backDrop.classList.remove("active");
    }
};
