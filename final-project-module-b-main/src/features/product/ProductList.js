import { getApi, urlProduct } from "../../../main";

const ProductList = async (arr = null) => {
    try {
        const products = arr || (await getApi(urlProduct));

        if (!products || products.length === 0) {
            return `<p class="text-center text-muted">Không có sản phẩm nào!</p>`;
        }
        console.log(products);

        let productHtml = products
            .map(
                (product, i) => `
                <div class="col-4">
                    <div class="product__card" data-index="${i}">
                        <img src="${product.images}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card__title line__camp--1">${product.title}</h5>
                            <p class="card__text line__camp--2">${product.description}</p>
                            <div class="cart__qnt">
                              <span>$${product.price}</span>
                              <div class="cart__rating">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="19"
                                  height="18"
                                  viewBox="0 0 19 18"
                                  fill="none">
                                  <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M10.6043 1.17701L12.4317 4.82776C12.6108 5.18616 12.9565 5.43467 13.3573 5.49218L17.4453 6.08062C18.4554 6.22644 18.8573 7.45054 18.1263 8.15194L15.1702 10.9924C14.8797 11.2718 14.7474 11.6733 14.8162 12.0676L15.5138 16.0778C15.6856 17.0698 14.6298 17.8267 13.727 17.3574L10.0732 15.4627C9.71502 15.2768 9.28602 15.2768 8.92679 15.4627L5.273 17.3574C4.37023 17.8267 3.31439 17.0698 3.48724 16.0778L4.18385 12.0676C4.25257 11.6733 4.12033 11.2718 3.82982 10.9924L0.87368 8.15194C0.142715 7.45054 0.544642 6.22644 1.55466 6.08062L5.64265 5.49218C6.04354 5.43467 6.39028 5.18616 6.56937 4.82776L8.39574 1.17701C8.84765 0.274331 10.1523 0.274331 10.6043 1.17701Z"
                                      fill="#FFB700"
                                  />
                                  </svg>
                                  <span>${product.rating}</span>
                              </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            `
            )
            .join("");

        return `
        <div class="row g-4">
            ${productHtml}
        </div>
        `;
    } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        return `<p class="text-danger">Lỗi tải dữ liệu, vui lòng thử lại sau!</p>`;
    }
};

export default ProductList;
