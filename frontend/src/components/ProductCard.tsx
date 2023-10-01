import { BsBookmarkHeart, BsStarFill } from 'react-icons/bs';
import "@/styles/components/productCard.scss";
import { useEffect, useState } from 'react';
import ButtonSpinner from '@/layouts/ButtonSpinner';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState, wishListState } from '@/state/atoms';
import { addToCart } from '@/utils/cartUtiles';
import { addRemoveFromWishlist } from '@/utils/wishlistUtiles';
import Toast from '@/layouts/Toast';
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
    const [checkOutCart, setCheckOutCart] = useState(false);
    const location = useLocation()
    // const [isCartActive, setIsCartActive] = useState(false);
    const recoilState = useRecoilState(cartState);
    const wishListsState = useRecoilState(wishListState)
    const wishListData = useRecoilValue(wishListState)

    const navigate = useNavigate()

    const onClick = (data: ApiResponse) => {
        setIsLoading(true);
        //if recoil state already have that state then he navigate on cart page
        const isTrue = recoilState[0].findIndex(val => val._id === data._id);
        if (isTrue >= 0) {
            //index found
            navigate("/cart");
            return;

        }
        //so change content of button -->Go To Cart
        // useAddToCart(data)
        toast.success("Item has been added in cart")
        new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            addToCart(recoilState, data)
            setCheckOutCart(true);
            setIsLoading(false)
        }).catch((err) => console.log(err))

        // await new Promise((resolve) => setTimeout(resolve, 1000))
        // navigate("/cart");
    }
    const addItemInWishlist = () => {
        if (!isActive) {
            toast.success("Item has been added in Wishlist");
        }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wishListState, wishListData])

    const getButtonText = (): string => {
        return checkOutCart ? "Go to Cart" : "Add to Bag"
    }
    const wishListButtonStyles = (): { gap: number, justifyContent: string } => {
        const styles: { gap: number, justifyContent: string } = {};
        if (location.pathname === "/wishlist") {
            styles.gap = 0;
            styles.justifyContent = "center"
            return styles;
        }
        return {};
    }
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
                        <div className="last" style={wishListButtonStyles()}>
                            <button className="rm-bag" onClick={() => onClick(data)}>
                                {isLoading ? <ButtonSpinner size={20} /> : getButtonText()}
                            </button>
                            {
                                location.pathname === "/wishlist" ? "" : <i className={`wishlist ${isActive ? "active-wishlist" : ""}`} onClick={() => addItemInWishlist(data)}>
                                    <BsBookmarkHeart />
                                </i>
                            }

                        </div>
                    </div>
                </div>
            </div>





        </>
    )
};

export default Card;
