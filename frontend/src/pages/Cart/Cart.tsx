import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { BsBookmarkHeart } from "react-icons/bs";
import './style.css';
import { useSelector } from 'react-redux';
import { useMemo } from 'react'
import { useDispatch } from 'react-redux';
import { removeItemFromBag } from '../../features/cartSlice';


const CartCard = (data) => {
  // console.log(data)
  const { image, name, price, newPrice, count, id } = data.data;
  const dispatch = useDispatch();
  return (
    <div className="cart-card my-4">
      <div className="card_items">
        <div className="image">
          <img src={image} alt="" />
        </div>
        <div className="content_">
          <h6>{name}</h6>
          <div className='quantity'>
            <span>Quantity:</span>
            <div className='d-flex'>
              <span>
                <i><AiOutlineMinus /></i>
              </span>
              <span className='count'>
                {count}
              </span>
              <span>
                <i><AiOutlinePlus /></i>
              </span>

            </div>
          </div>
          <div className="last">
            <button className="rm-bag" onClick={() => dispatch(removeItemFromBag(id))}>
              Remove From Bag
            </button>
            <i className='wishlist'>
              <BsBookmarkHeart />
            </i>
          </div>
        </div>
      </div>
      <div className="price">

        <span>₹{newPrice}</span>
        <span>₹ {price}</span>
      </div>
    </div>
  )
}

const PriceCard = ({ data }) => {

  const total = useMemo(() => {
    let total = data?.reduce((current, val) => current + val.count * val.newPrice, 0)
    return total;
  }, [data]);
  // console.log(total)
  return (
    <div className='price-card'>
      <h4>Price Details</h4>
      {
        data?.map(val => {
          const { name, newPrice, count } = val;
          return (
            <div>
              <p>{name} ({count})item</p>
              <p>₹ {count * newPrice}</p>
            </div>
          )
        })
      }

      {/* <div className="line"></div> */}
      <hr />
      <div className="total">
        <p>Total</p>
        <p>₹ {total}</p>
      </div>
      <div>
        <button>Proceed to Checkout</button>
      </div>
    </div>
  )
}
const Cart = () => {
  const value = useSelector(state => state.cart.data)

  return (
    <>
      <div className="cart-section">
        <div className="container pr">
          <h5>Bag(1)</h5>
          <div className="bag-items">
            <div className='first'>
              {
                value?.map(val => {
                  const { name, price, newPrice, image, count, id } = val;
                  return (
                    <CartCard data={{ name, price, newPrice, image, count, id }} />
                  )
                })
              }
            </div>
            <div className="price-details">
              <PriceCard data={value} />

            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Cart;
