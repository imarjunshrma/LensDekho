import { BsBookmarkHeart, BsStarFill } from 'react-icons/bs';
import './style.css';
import { addToBag } from '../../features/cartSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
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
const Card = (data: ApiResponse) => {
    const { name, category, image, price, newPrice, rating } = data;
    const dispatch = useDispatch()
    const val = useSelector(state => state.data)
    // console.log(val)
    return (
        <>
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
                            <button className="rm-bag" onClick={() => dispatch(addToBag(data))}>
                                Add to Bag
                            </button>
                            <i className='wishlist'>
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
