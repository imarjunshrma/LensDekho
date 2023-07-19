
import { useEffect, useState } from "react";
import Cards from "../../components/Card/Cards";
import Card from "../../components/CategoryCard/Card";
import HeroSection from "../../components/Hero/HeroSection";
import axios from "axios";

const category = [
  {
    title: "Vision",
    img: "/vision.jpg"
  },
  {
    title: "Sports",
    img: "/sports.jpg"
  }, {
    title: "Sunglasses",
    img: "/sunglasses.jpg"
  }
]
const Home = () => {
  const [data, setData] = useState([])
  const fetchProducts = async (): any => {
    try {
      const res = await axios.get("http://localhost:3002/lens")
      const datax = res.data.msg;
      datax.length = 7;
      setData(datax)
    } catch (err) {
      console.log(err)

    }
  }
  useEffect(() => {
    fetchProducts();
  }, [])
  return (
    <>

      <HeroSection />
      <div className="trending-products">
        <div className="container pr px">
          <div className="row gx-2">
            <div className="col-3 d-flex justify-content-center align-items-center">
              <h2 className='head'>Trending Products</h2>
            </div>
            {
              data.map(val => {
                const { name, category, price, image, _id } = val
                return (
                  <div className="col-3 my-4">
                    <Cards name={name} category={category} price={price} image={image} id={_id} />
                  </div>
                )
              })

            }

          </div>
        </div>
      </div>
      <div className="categories-section">
        <div className="container pr px">
          <h3 className='text-center head'>Categories</h3>
          <div className="row">
            {
              category.map(val => {
                return (
                  <div className="col-4">
                    <Card title={val.title} img={val.img} />
                  </div>
                )
              })
            }

          </div>
        </div>
      </div>


    </>
  )
};

export default Home;
