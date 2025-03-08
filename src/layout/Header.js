import { $ } from "../../main";

const search = $("#search");
const searchButton = $(".header__search--btn");

if (searchButton) {
    searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        search.classList.toggle("active");
    });
}

const headerCartPrice = $(".header__cart--count");

function updateCart() {
    if (!headerCartPrice) return 0;

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = cartItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
    );

    headerCartPrice.innerHTML = "$" + totalPrice.toLocaleString();
    return totalPrice;
}

const modalContainer = $(".modal__container");
const cartIconBtn = $(".header__cart");
const backDrop = $(".modal__backdrop");

function renderModal() {
    const cartProduct = JSON.parse(localStorage.getItem("cart")) || [];

    if (!modalContainer) return;

    if (!cartProduct.length) {
        modalContainer.innerHTML = "<h2>Không có sản phẩm nào</h2>";
        return;
    }

    const subtotal = updateCart();
    const shippingFee = 10;
    const totalPrice = subtotal + shippingFee;

    modalContainer.innerHTML = `
        <div class="modal__row">
            <span>Subtotal:</span>
            <span class="subtotal">$${subtotal.toLocaleString()}</span>
        </div>
        <div class="modal__row">
            <span>Taxes:</span>
            <span>Free</span>
        </div>
        <div class="modal__row">
            <span>Shipping:</span>
            <span>$${shippingFee}</span>
        </div>
        <div class="modal__row">
            <span>Total Price:</span>
            <span class="totalPrice">$${totalPrice.toLocaleString()}</span>
        </div>
        <button id="check__out" class="btn btn-warning">Check out</button>
    `;

    const checkOut = $("#check__out");
    if (checkOut) {
        checkOut.onclick = () => {
            localStorage.removeItem("cart");
            backDrop.classList.remove("active");
            updateCart();
            renderModal();
            alert("Đặt hàng thành công!");
        };
    }
}

// Hiển thị modal ban đầu
renderModal();

if (cartIconBtn) {
    cartIconBtn.onclick = () => {
        backDrop.classList.add("active");

        backDrop.onclick = (e) => {
            if (e.target.closest(".modal__backdrop")) {
                backDrop.classList.remove("active");
            }
        };

        renderModal();
    };
}

document.onkeydown = (e) => {
    if (e.key === "Escape") {
        backDrop.classList.remove("active");
    }
};
