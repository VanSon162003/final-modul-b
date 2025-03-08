import { Button } from "../components/common/Button";

function Production(product) {
    return `
        <section class="production">
           <div class="production__media">
             <img src="${product.images}" alt="${product.title}">
           </div>

           <div class="production__content">
            <h2 class="production__heading">${product.title}</h2>

            <div class="production__rating">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" 
                        d="M10.1043 1.17701L11.9317 4.82776C12.1108 5.18616 12.4565 5.43467 12.8573 5.49218L16.9453 6.08062C17.9554 6.22644 18.3573 7.45054 17.6263 8.15194L14.6702 10.9924C14.3797 11.2718 14.2474 11.6733 14.3162 12.0676L15.0138 16.0778C15.1856 17.0698 14.1298 17.8267 13.227 17.3574L9.57321 15.4627C9.21502 15.2768 8.78602 15.2768 8.42679 15.4627L4.773 17.3574C3.87023 17.8267 2.81439 17.0698 2.98724 16.0778L3.68385 12.0676C3.75257 11.6733 3.62033 11.2718 3.32982 10.9924L0.37368 8.15194C-0.357285 7.45054 0.0446417 6.22644 1.05466 6.08062L5.14265 5.49218C5.54354 5.43467 5.89028 5.18616 6.06937 4.82776L7.89574 1.17701C8.34765 0.274331 9.65235 0.274331 10.1043 1.17701Z"
                        fill="#FFB700"/>
                </svg>
                <span>(${product.rating}) ${
        product.reviews.length
    } reviews</span>
                <span>Stock: ${product.stock}</span>
            </div>

            <div class="production__qnt">
                <label for="quantity">Số lượng:</label>
                <input type="number" id="quantity" name="quantity" min="1" max="${
                    product.stock
                }" value="1">
            </div>

            <div class="production__price">
                <span>$</span>
                <span class="production__price--value">${product.price}</span>
            </div>

            ${Button({
                children: "Add to cart",
                className: "btn btn-warning add__cart",
            })}

            <!-- Review Section -->
            <div class="production__reviews">
                <h3>Customer Reviews</h3>
                ${
                    product.reviews.length > 0
                        ? product.reviews
                              .map(
                                  (review) => `
                        <div class="review">
                            <strong>${review.reviewerName}</strong>
                            <span>${"★".repeat(review.rating)}${"☆".repeat(
                                      5 - review.rating
                                  )}</span>
                            <p>${review.comment}</p>
                        </div>
                    `
                              )
                              .join("")
                        : "<p>No reviews yet.</p>"
                }
            </div>

           </div>
        </section>
    `;
}

export default Production;
