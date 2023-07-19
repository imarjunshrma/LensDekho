import './style.css';
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
              <button className="start-shopping">
                Start Shopping
              </button>
              <button className="explore-more">
                Explore More
              </button>
            </div>
          </div>
          <div className="col-6">
            <div className='img'>
              <img src="https://eyesome.netlify.app/static/media/bannerImg.712fc34e6a2084115f10.png" alt="" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
};

export default HeroSection;
