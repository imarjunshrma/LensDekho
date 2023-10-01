import { useState, useEffect, useRef } from 'react';
import Card from '@/components/ProductCard';
import '@/styles/pages/product.scss';
import { IoFilterSharp } from 'react-icons/io5'
import axios, { AxiosResponse } from 'axios';
import { Location, useLocation } from 'react-router-dom';
import ProductSlider from '@/components/ProductSlider';
import Sidebar from '@/layouts/Sidebar';
export interface FilterParams {
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
export interface QueryTuple {
  gender: string,
  category: string,
  rating: string,
  price: string
}


const Product = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false)
  const [data, setData] = useState<ApiResponse[] | []>([])
  const location: Location = useLocation();
  const ref = useRef<ApiResponse[]>();
  const [query, setQuery] = useState<QueryTuple>({
    gender: "All",
    category: "",
    rating: "",
    price: ""
  })
  // console.log(location.state.title)
  const fetchProducts = async (): Promise<void> => {
    try {
      const res: AxiosResponse<{ msg: ApiResponse[] }> = await axios.get<{ msg: ApiResponse[] }>("http://localhost:3004/lens")
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
  useEffect(() => {
    if (location) {
      const val: string = location.state;
      if (!val) return;
      setQuery({ ...query, category: val.title })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])
  const fetchProductByQuery = async (url: string): Promise<void> => {
    try {
      const res: AxiosResponse<{ msg: ApiResponse[] }> = await axios.get<{ msg: ApiResponse[] }>(url)
      if (res.data.msg?.length >= 0) {
        setData(res.data.msg);
        ref.current = res.data.msg;
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (!query) {
      return;
    }
    let url = 'http://localhost:3004/lens?';
    if (query.gender) {
      url += `gender=${query.gender}&`
    }
    if (query.category) {
      url += `category=${query.category}&`;
    }
    if (query.rating) {
      url += `rating=${query.rating}&`;
    }
    if (query.price) {
      url += `price=${query.price}&`;
    }
    url = url.slice(0, -1);
    void fetchProductByQuery(url)
  }, [query])
  // console.log(data)

  const sortData = (x: string) => {
    //x-->0 no sort
    //x-->1-->low to high
    //x-->-1-->high to low
    console.log(ref)
    if (Number(x) === 1) {
      const nx = data.slice().sort((a, b) => a.newPrice - b.newPrice);//slice is using sothat original array could't modified
      setData(nx);
    } else if (Number(x) === -1) {
      const nx = data.slice().sort((a, b) => b.newPrice - a.newPrice);//slice is using sothat original array could't modified
      setData(nx)
    } else {
      setData(ref.current);
    }
  }

  return (
    <>
      <div className="product-section">
        <div className="container">
          <div className="p-hero">
            {/* <img src="https://eyesome.netlify.app/static/media/bannerHero.b913ee7a0754b4966295.jpg" alt="" /> */}
            <ProductSlider />
          </div>
          <div className="p-products">
            <div className="thead">
              <h3>Glasses For You !</h3>
              <div className="drp">

                <select className="selectpicker" onChange={(e) => sortData(e.target.value)}>
                  <option value={0}>Sort By Price</option>
                  <option value={1}>Low to High</option>
                  <option value={-1}>High to Low</option>
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
                  data.map((val: Partial<ApiResponse>) => {
                    const { name, category, price, image, _id, description, rating, gender, quantity, newPrice, weight } = val;
                    return (
                      <div className="col-lg-3 px-0">
                        <Card name={name} category={category} price={price} image={image} _id={_id} description={description}
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
        isOpenSidebar && <Sidebar setIsOpenSidebar={setIsOpenSidebar} query={query} setQuery={setQuery} />
      }

    </>
  )
};

export default Product;
