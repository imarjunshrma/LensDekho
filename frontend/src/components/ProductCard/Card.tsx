import { BsBookmarkHeart, BsStarFill } from 'react-icons/bs';
import './style.css';
import { useEffect, useMemo, useState } from 'react';
import ButtonSpinner from '../../layouts/spinner/ButtonSpinner';
import Toast from '../../layouts/toast/Toast';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState, wishListState } from '../../state/atoms';
import { addToCart } from '../../utils/cartUtiles';
import { addRemoveFromWishlist } from '../../utils/wishlistUtiles';
export interface ApiResponse {
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
const Card = (data: Partial<ApiResponse>) => {
    const { name, category, image, price, newPrice, rating } = data;
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isActive, setIsActive] = useState(false);
    const recoilState = useRecoilState(cartState);
    const wishListsState = useRecoilState(wishListState)
    const wishListData = useRecoilValue(wishListState)
    const navigate = useNavigate()
    const onClick = (data: ApiResponse) => {
        setIsLoading(true);
        // await new Promise((resolve) => setTimeout(resolve, 400))
        // dispatch(addToBag(data))
        addToCart(recoilState, data)
        // useAddToCart(data)
        toast.success("Item has been added in cart")
        setIsLoading(false)
        // await new Promise((resolve) => setTimeout(resolve, 1000))
        // navigate("/cart");
    }
    const addItemInWishlist = () => {
        addRemoveFromWishlist(wishListsState, data)
    }
    useEffect(() => {
        for (let el of wishListData) {
            if (el._id === data._id) {
                setIsActive(true)
                return;
            }
        }
        setIsActive(false);
    }, [wishListState, wishListData])
    return (
        <>
            <Toast />
            <div className='pr-card-container my-4'>
                <div className="card pr-cards">
                    <div className="image">
                        <img src={image} className="card-img-top" alt="..." />
                    </div>
                    <div className="card-body">
                        <div className="head">
                            <h5>{name}</h5>
                            <p className="price">{newPrice}</p>
                        </div>
                        <div className="rating-div">
                            <div>
                                <p className="rate">
                                    {rating}
                                </p>
                                <i className='star'>
                                    <BsStarFill />
                                </i>
                                <span className='rating-text'>

                                    Rating
                                </span>
                            </div>
                            <p className="org-price">
                                {price}
                            </p>

                        </div>
                        <div className="category">
                            {category}
                        </div>
                        <hr />
                        <div className="last">
                            <button className="rm-bag" onClick={() => onClick(data)}>
                                {isLoading ? <ButtonSpinner size={20} /> : "Add to Bag"}
                            </button>
                            <i className={`wishlist ${isActive ? "active-wishlist" : ""}`} onClick={() => addItemInWishlist(data)}>
                                <BsBookmarkHeart />
                            </i>
                        </div>
                    </div>
                </div>
            </div>





        </>
    )
};

export default Card;
