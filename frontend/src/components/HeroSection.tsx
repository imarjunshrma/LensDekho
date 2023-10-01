import "@/styles/components/heroSection.scss"
import Button from "./Button";
const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="container pr">
        <div className="row">
          <div className="col-6">
            <div>
              <h1>Glasses & Lens</h1>
              <p>Buy the best high-quality sunglasses from us.
                More than 100 types of assortment.</p>
            </div>
            <div className="button_con">
              <Button text="Start Shopping" classes="primary" />
              <Button text="Explore More" classes="secondary" />
            </div>
          </div>
          <div className="col-6">
            <div className='img'>
              <img src="/pexels-shane-aldendorff-1054777.jpg" alt="" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
};

export default HeroSection;
