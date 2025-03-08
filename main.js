import Navigo from "navigo";
import "./style.css";
import HomePage from "./src/pages/HomePage";
import AboutPage from "./src/pages/AboutPage";
import LoginPage from "./src/pages/LoginPage";
import RegisterPage from "./src/pages/RegisterPage";
import NotFoundPage from "./src/pages/NotFoundPage";
import ProductList from "./src/features/product/ProductList";
import Production from "./src/pages/Production";

export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

const app = document.querySelector("#app");
async function render(contentFn, beforeFn = null, afterFn = null) {
    beforeFn && beforeFn();
    app.innerHTML =
        contentFn.constructor.name === "AsyncFunction"
            ? await contentFn()
            : contentFn();
    afterFn && afterFn();
}

export const router = new Navigo("/", { linksSelector: "a" });

export const urlProduct = "http://localhost:3000/products";
export const urlUser = "http://localhost:3000/users";

export const getApi = async (url) => {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Lỗi API");
        return await res.json();
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
};

router.on("/", async () => {
    await render(HomePage, null, async () => {
        const showMore = $(".show__more");
        const productContainer = $(".product");
        const filter = $("#filter");
        const filterInner = $(".filter__inner");
        const filterBtn = $(".btn__filter");
        const search = $("#search");

        const newProduct = await getApi(urlProduct);

        // slide

        const slide = $(".carousel-inner");

        slide.style.cursor = "pointer";

        slide.onclick = () => {
            router.navigate("/product");
        };

        // search

        async function handleSearch(searchValue) {
            const trimmedValue = searchValue.trim().toLowerCase();
            if (!trimmedValue)
                productContainer.innerHTML = await ProductList(newProduct);

            const filteredSearchProducts = newProduct.filter((product) =>
                product.title.toLowerCase().includes(trimmedValue)
            );

            productContainer.innerHTML = await ProductList(
                filteredSearchProducts
            );
        }

        function debounce(cb, delay = 1000) {
            let timeout;
            return (value) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => cb(value), delay);
            };
        }

        // Gọi debounce() với input.value được truyền vào
        search.addEventListener(
            "input",
            debounce((e) => handleSearch(e.target.value))
        );

        // show more

        showMore.addEventListener("click", () => {
            productContainer.classList.toggle("show");
            showMore.classList.toggle("show");
        });

        // filter products by price and rating

        filter.addEventListener("click", () => {
            filterInner.classList.toggle("active");
        });

        filterBtn.addEventListener("click", async () => {
            const priceFilter = document.querySelector(
                'select[name="price"]'
            ).value;
            const ratingFilter = document.querySelector(
                'select[name="rating"]'
            ).value;

            let filteredProducts = [...newProduct];

            if (priceFilter === "low") {
                filteredProducts.sort((a, b) => a.price - b.price);
            } else if (priceFilter === "high") {
                filteredProducts.sort((a, b) => b.price - a.price);
            }

            if (ratingFilter === "low") {
                filteredProducts.sort((a, b) => a.rating - b.rating);
            } else if (ratingFilter === "high") {
                filteredProducts.sort((a, b) => b.rating - a.rating);
            }

            productContainer.innerHTML = await ProductList(filteredProducts);
        });

        productContainer.onclick = (e) => {
            router.navigate(`/product`);
        };
    });
});

router.on("/product", async () => {
    await render(
        async () => {
            const newArr = await getApi(urlProduct);

            return Production(
                newArr[Math.floor(Math.random() * newArr.length) + 1]
            );
        },
        null,
        async () => {
            const qnt = $("#quantity");
            const priceElement = $(".production__price--value");
            const cartBtn = $(".add__cart");

            function getCart() {
                return JSON.parse(localStorage.getItem("cart")) || [];
            }

            function saveCart(cart) {
                localStorage.setItem("cart", JSON.stringify(cart));
            }

            if (qnt && priceElement) {
                let basePrice = parseFloat(
                    priceElement.textContent.replace(/,/g, "")
                );
                let newValue = parseInt(qnt.value, 10) || 1;

                function updatePrice(quantity, price) {
                    const totalPrice = quantity * price;
                    priceElement.textContent = totalPrice.toLocaleString();
                }

                updatePrice(newValue, basePrice);

                qnt.addEventListener("input", (e) => {
                    newValue = parseInt(e.target.value, 10);
                    if (isNaN(newValue) || newValue < 1) newValue = 1;
                    if (newValue > +qnt.max) newValue = +qnt.max;

                    e.target.value = newValue;
                    updatePrice(newValue, basePrice);
                });

                const headerCartPrice = $(".header__cart--count");

                cartBtn.onclick = () => {
                    const cart = getCart();

                    const product = {
                        quantity: newValue,
                        price: basePrice,
                    };

                    cart.push(product);
                    saveCart(cart);

                    alert("Sản phẩm đã được thêm vào giỏ hàng!");

                    function updateCart() {
                        if (headerCartPrice) {
                            const cartPrice =
                                JSON.parse(localStorage.getItem("cart")) || [];

                            if (!cartPrice.length) {
                                headerCartPrice.innerHTML = "$0";
                            } else {
                                let priceCount = cartPrice.reduce(
                                    (total, cart) => {
                                        return (
                                            total + cart.quantity * cart.price
                                        );
                                    },
                                    0
                                );

                                headerCartPrice.innerHTML =
                                    "$" + priceCount.toLocaleString();
                            }
                        }
                    }

                    updateCart();
                };
            }
        }
    );
});

router.on("/about", () => render(AboutPage));
router.on("/login", () => render(LoginPage));
router.on("/register", () => render(RegisterPage));
router.notFound(() => render(NotFoundPage));

router.resolve();
