import { useState, useEffect } from 'react';
import Card from '../../components/ProductCard/Card';
import Sidebar from '../../layouts/sidebar/Sidebar';
import './style.css';
import { IoFilterSharp } from 'react-icons/io5'
import axios, { AxiosResponse } from 'axios';
interface FilterParams {
  gender?: string;
  category?: string;
  rating?: string;
  price?: string;
}
interface ApiResponse {
  brand: string,
  category: string,
  description: string,
  gender: string,
  image: string,
  name: string,
  newPrice: string,
  price: string,
  qty: string,
  quantity: string,
  rating: string,
  weight: string,
  _id: string
}
const Product = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false)
  const [data, setData] = useState<ApiResponse[] | []>([])
  const fetchProducts = async (): Promise<void> => {
    try {
      const res: AxiosResponse<{ msg: ApiResponse[] }> = await axios.get<{ msg: ApiResponse[] }>("http://localhost:3002/lens")
      console.log(res)
      if (res.data.msg?.length > 0) {
        setData(res.data.msg);
      }
      // setData(res.data);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    setIsOpenSidebar(true);
    void fetchProducts();
    return () => {
      isOpenSidebar && setIsOpenSidebar(false)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filterByQuery = async (el: FilterParams) => {
    let url = 'http://localhost:3002/lens?';
    if (el.gender) {
      url += `gender=${el.gender}&`;
    }
    if (el.category) {
      url += `category=${el.category}&`;
    }
    if (el.rating) {
      url += `rating=${el.rating}&`;
    }
    if (el.price) {
      url += `price=${el.price}&`;
    }
    url = url.slice(0, -1);
    try {
      console.log(url)
      const res: AxiosResponse<{ msg: ApiResponse[] }> = await axios.get<{ msg: ApiResponse[] }>(url)
      console.log(res)
      if (res.data.msg?.length > 0) {
        setData(res.data.msg);
      }
      // setData(res.data);
    } catch (err) {
      console.log(err)
    }
  }
  // console.log(data)
  return (
    <>
      <div className="product-section">
        <div className="container">
          <div className="p-hero">
            <img src="https://eyesome.netlify.app/static/media/bannerHero.b913ee7a0754b4966295.jpg" alt="" />
          </div>
          <div className="p-products">
            <div className="thead">
              <h3>Glasses For You !</h3>
              <div className="drp">

                <select className="selectpicker">
                  <option>Sort By Price</option>
                  <option>Low to High</option>
                  <option>High to Low</option>
                </select>
                <button className={`r-sidebar ${isOpenSidebar ? "fill-rsidebar" : ""}`} onClick={() => setIsOpenSidebar(!isOpenSidebar)}>
                  <IoFilterSharp />
                  Filters
                </button>
              </div>
            </div>
            <div className="p-cards_">
              <div className="row">
                {
                  data.map((val: ApiResponse) => {
                    const { name, category, price, image, _id, description, rating, gender, quantity, newPrice, weight } = val;
                    return (
                      <div className="col-lg-3 px-0">
                        <Card name={name} category={category} price={price} image={image} id={_id} description={description}
                          rating={rating} gender={gender} quantity={quantity} newPrice={newPrice}
                          weight={weight}
                        />
                      </div>
                    )
                  })
                }

              </div>
            </div>
          </div>
        </div>
      </div>
      {
        isOpenSidebar && <Sidebar setIsOpenSidebar={setIsOpenSidebar} filterByQuery={filterByQuery} />
      }

    </>
  )
};

export default Product;
