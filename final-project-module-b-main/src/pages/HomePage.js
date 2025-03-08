import { Button } from "../components/common/Button";
import Slides from "../components/ui/Slides";
import ProductList from "../features/product/ProductList";
import style from "./HomePage.module.css";

console.log(style);

async function HomePage() {
    try {
        const [slidesHTML, productListHTML] = await Promise.all([
            Slides(),
            ProductList(),
        ]);

        return `
            <div>
                ${slidesHTML}
                <div class="${style.homepage__filter} home__filter">
                    <h2 style="
                        font-size: 2.4rem;
                        font-weight: 700;
                        line-height: 141.667%;
                    ">Total LavAzza 1320</h2>

                    <button class="${style.filter} no-copy" id="filter">
                        <span>Filter</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="17"
                            viewBox="0 0 19 17"
                            fill="none">
                            <path d="M7.83001 13.593H1.5293" stroke="#D2D1D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10.6406 3.90164H16.9413" stroke="#D2D1D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.22629 3.84625C6.22629 2.5506 5.16813 1.5 3.86314 1.5C2.55816 1.5 1.5 2.5506 1.5 3.84625C1.5 5.14191 2.55816 6.19251 3.86314 6.19251C5.16813 6.19251 6.22629 5.14191 6.22629 3.84625Z" stroke="#D2D1D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4997 13.5533C17.4997 12.2576 16.4424 11.207 15.1374 11.207C13.8316 11.207 12.7734 12.2576 12.7734 13.5533C12.7734 14.8489 13.8316 15.8995 15.1374 15.8995C16.4424 15.8995 17.4997 14.8489 17.4997 13.5533Z" stroke="#D2D1D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

					<div class="filter__inner">
						<select name="price">
							<option>price</option>
							<option>low</option>
							<option>high</option>
						</select>

						<select name="rating">
							<option>rating</option>
							<option>low</option>
							<option>high</option>
						</select>

						${Button({
                            children: "Result",
                            className: "btn btn-warning btn__filter",
                        })}
					</div>
                </div>

                <div class="product__show">
                	<section class="product">
	                    ${productListHTML}
	                </section>
					<button class="show__more">Show more</button>    

                </div>


               
            </div>
        `;
    } catch (error) {
        console.error("Lỗi khi tải trang chủ:", error);
        return `<p class="text-danger">Lỗi tải trang, vui lòng thử lại sau!</p>`;
    }
}

export default HomePage;
