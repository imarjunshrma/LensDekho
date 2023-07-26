import './style.css';
import { RiStarSFill } from 'react-icons/ri'
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsBookmarkHeart } from "react-icons/bs";
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToBag } from '../../features/cartSlice';
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
const ProductDetail = () => {
    const { id } = useParams<{ id: string | undefined }>()
    const [data, setData] = useState<ApiResponse[] | []>([])
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchProducts = async (): Promise<void> => {
            try {
                const res: AxiosResponse<{ response: ApiResponse[] }> = await axios.get<{ response: ApiResponse[] }>(`http://localhost:3002/lens/${id}`)
                if (res.data.response.length > 0) {
                    setData(res.data.response);
                }
                // setData(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        void fetchProducts();
    }, [id])
    return (
        <div>
            {
                data.length ? data.map((val: ApiResponse) => <div className='product_container'>
                    <div className="container pr px">
                        <div className="crow">
                            <div className="ccol col_">
                                <div className="colx_gap">
                                    <img src={val.image} alt="" />
                                </div>
                            </div>
                            <div className="ccol contentx_">
                                <div className='colx_gap'>
                                    <div className='content_'>
                                        <h4>{val.name}</h4>
                                        <p className='desc'>{val.description}</p>
                                        <div className="ratings">
                                            <span className="stars">
                                                <i><RiStarSFill /></i>
                                                <i><RiStarSFill /></i>
                                                <i><RiStarSFill /></i>
                                                <i><RiStarSFill /></i>
                                                <i><RiStarSFill /></i>
                                            </span>
                                            <span>({val.rating}) Ratings</span>
                                        </div>
                                        <h6>About Product</h6>
                                        <ul>
                                            <li>Brand: <span>{val.brand}</span></li>
                                            <li>Gender: <span>{val.gender}</span></li>
                                            <li>Category: <span>{val.category}</span></li>
                                            <li>Heavy: <span>{val.quantity}</span></li>

                                        </ul>
                                        <p className="price">Price:
                                            <span className='actual-price'>₹{val.newPrice}</span>
                                            <span className='cross-price'>₹{val.price}</span></p>
                                        <div className='btn-container_'>
                                            {/* <button className="add-bag">Add to Bag</button> */}
                                            <a className="add-bag" onClick={() => dispatch(addToBag(val))}>
                                                <span><HiOutlineShoppingBag /></span>
                                                <span>
                                                    Add to Bag
                                                </span>
                                            </a>
                                            <a href="" className="bookmark">
                                                <span><BsBookmarkHeart /></span>
                                                <span>
                                                    Wishlist Item

                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>) : ""
            }
        </div>

    )
};

export default ProductDetail;
