import { useState, useEffect, useRef } from 'react';
import Card from '@/components/ProductCard';
import '@/styles/pages/product.scss';
import { IoFilterSharp } from 'react-icons/io5'
import axios, { AxiosResponse } from 'axios';
import { Location, useLocation } from 'react-router-dom';
import ProductSlider from '@/components/ProductSlider';
import Sidebar from '@/layouts/Sidebar';
import { API_URL } from '@/constant/apiConstant';
import { useRecoilState } from 'recoil';
import { inputValue, searchResultState } from '@/state/atoms';
import { QueryTuple, ApiResponse } from '@/interfaces';
import { PuffLoader } from 'react-spinners';



const Product = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false)
  const [data, setData] = useState<ApiResponse[] | []>([])
  const location: Location = useLocation();
  const ref = useRef<ApiResponse[]>();
  const [searchResult] = useRecoilState<any>(searchResultState)
  const [inputVal] = useRecoilState(inputValue)
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState<QueryTuple>({
    gender: "All",
    category: "",
    rating: "",
    price: ""
  })
  // console.log(location.state.title)
  const fetchProducts = async (): Promise<void> => {
    try {
      const res: AxiosResponse<{ msg: ApiResponse[] }> = await axios.get<{ msg: ApiResponse[] }>(`${API_URL}/lens`)
      if (res.data.msg?.length > 0) {
        setData(res.data.msg);
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      }
      // setData(res.data);
    } catch (err) {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    // setIsOpenSidebar(true);
    setIsLoading(true);
    void fetchProducts();
    return () => {
      isOpenSidebar && setIsOpenSidebar(false)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (location) {
      const val = location.state;
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
    let url = `${API_URL}/lens?`;
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
    if (Number(x) === 1) {
      const nx = data.slice().sort((a: any, b: any) => a.newPrice - b.newPrice);//slice is using sothat original array could't modified
      setData(nx);
    } else if (Number(x) === -1) {
      const nx = data.slice().sort((a: any, b: any) => b.newPrice - a.newPrice);//slice is using sothat original array could't modified
      setData(nx)
    } else {
      setData(ref.current);
    }
  }
  function isEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }
  function setDataBySearch() {
    if (isEmpty(searchResult)) return;
    if (searchResult) {

      //refactor
      const newAr = searchResult?.data.map((ar) => {
        return ar.item;
      })
      setData(newAr)
    }
  }
  useEffect(() => {
    setDataBySearch();
  }, [searchResult])
  useEffect(() => {
    if (ref.current) {
      //check input fields does not have any value
      if (!inputVal.length && !data.length) {
        setData(ref.current)
      }
    }

  }, [inputVal])
  if (isLoading) {
    return <div className='empty-spinner'>
      <PuffLoader color="#0d0f0f" />
    </div>
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
                  data.map((val: Partial<ApiResponse>, index: number) => {
                    const { name, category, price, image, _id, description, rating, gender, quantity, newPrice, weight } = val;
                    return (
                      <div className="col-lg-3 px-0" key={index}>
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
          {/* no result found */}
          {
            !data.length ? <div className='empty-state'>

              <h5>Sorry! No result found</h5>
            </div> : ""
          }
        </div>
      </div>
      {
        isOpenSidebar && <Sidebar setIsOpenSidebar={setIsOpenSidebar} query={query} setQuery={setQuery} />
      }

    </>
  )
};

export default Product;
