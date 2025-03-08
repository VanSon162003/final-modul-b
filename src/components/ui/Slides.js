import { getApi, urlProduct } from "../../../main";

import "./Slides.css";
const Slides = async () => {
    try {
        const items = await getApi(urlProduct);

        let dots = items
            .map((item, i) => {
                return `
                    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="${i}" 
                        class="${i === 0 ? "active" : ""}"></button>
                `;
            })
            .join("");

        let slidesImg = items
            .map((item, i) => {
                return `
                    <div class="carousel-item ${i === 0 ? "active" : ""}">
                        <img src="${
                            item.images
                        }" class="d-block w-100" alt="Slide ${i + 1}">
                    </div>
                `;
            })
            .join("");

        return `
            <div id="carouselExample" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="false">
                <!-- Indicators (Dots) -->
                <div class="carousel-indicators">
                    ${dots}
                </div>

                <!-- Slide Images -->
                <div class="carousel-inner">
                    ${slidesImg}
                </div>

                <!-- Prev/Next buttons -->
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span class="carousel-control-next-icon"></span>
                </button>
            </div>
        `;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        return `<p style="color:red;">Lỗi tải dữ liệu, vui lòng thử lại sau!</p>`;
    }
};

export default Slides;
