import '@/styles/pages/productDetail.scss';
import { RiStarSFill } from 'react-icons/ri'
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsBookmarkHeart } from "react-icons/bs";
import { useNavigate, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { addToCart } from '@/utils/cartUtiles';
import { cartState, wishListState } from '@/state/atoms';
import { addRemoveFromWishlist } from '@/utils/wishlistUtiles';
import ButtonSpinner from '@/layouts/ButtonSpinner';
import { API_URL } from '@/constant/apiConstant';
import { ApiResponse } from '@/interfaces';

const ProductDetail = () => {
    const { id } = useParams<{ id: string | undefined }>()
    const [data, setData] = useState<ApiResponse[] | []>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const recoilState = useRecoilState(cartState);
    const wishListsState = useRecoilState(wishListState)
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProducts = async (): Promise<void> => {
            try {
                const res: AxiosResponse<{ response: ApiResponse[] }> = await axios.get<{ response: ApiResponse[] }>(`${API_URL}/lens/${id}`)
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
    const addToBag = (data: ApiResponse) => {
        setIsLoading(true);
        addToCart(recoilState, data)
        new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            setIsLoading(false)
            navigate("/cart")
        }).catch((err) => console.log(err))
        // await new Promise((resolve) => setTimeout(resolve, 1000))
        // navigate("/cart");
    }
    const addToWishlist = (data: ApiResponse) => {
        addRemoveFromWishlist(wishListsState, data)
    }
    useEffect(() => {
        for (let el of wishListsState[0]) {
            console.log(el, data[0])
            if (el._id === data[0]._id) {
                setIsActive(true)
                return;
            }
        }
        setIsActive(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wishListState[0]])
    console.log(isActive)
    return (
        <div>
            {
                data.length ? data.map((val: ApiResponse, index: number) => <div className='product_container' key={index}>
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
                                            <a className="add-bag" onClick={() => addToBag(val)}>
                                                <span><HiOutlineShoppingBag /></span>
                                                <span>
                                                    {isLoading ? <ButtonSpinner size={20} /> : "Add to Bag"}
                                                </span>
                                            </a>
                                            <a className={`bookmark ${isActive ? "active-wishlist" : ""}`} onClick={() => addToWishlist(val)}>
                                                <span><BsBookmarkHeart /></span>
                                                <span >
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
