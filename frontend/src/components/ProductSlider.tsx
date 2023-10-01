import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
const data = [
    "1.webp", "2.webp", "3.webp", "4.webp"
]
const ProductSlider = () => {
    return (
        <OwlCarousel className='owl-theme'
            items={1}
            // loop
            margin={10}
            nav={true}
            navClass={["prevNavIcon", "nextNavIcon"]}
        >
            {
                data.map((image) => (
                    <div class='item'>
                        <img src={image} alt="" />
                    </div>

                ))
            }
        </OwlCarousel >
    )
};

export default ProductSlider;
