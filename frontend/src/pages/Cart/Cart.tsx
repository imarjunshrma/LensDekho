import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { BsBookmarkHeart } from "react-icons/bs";
import './style.css';
import { useSelector } from 'react-redux';

const CartCard = (data) => {
  // console.log(data)
  const { image, name, price, newPrice } = data.data;
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
                1
              </span>
              <span>
                <i><AiOutlinePlus /></i>
              </span>

            </div>
          </div>
          <div className="last">
            <button className="rm-bag">
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

const PriceCard = () => {
  return (
    <div className='price-card'>
      <h4>Price Details</h4>
      <div>
        <p>Alder Street (1)item</p>
        <p>₹ 2000</p>
      </div>
      {/* <div className="line"></div> */}
      <hr />
      <div className="total">
        <p>Total</p>
        <p>₹ 3199</p>
      </div>
      <div>
        <button>Proceed to Checkout</button>
      </div>
    </div>
  )
}
const Cart = () => {
  const value = useSelector(state => state.cart.data)
  console.log(value)
  return (
    <>
      <div className="cart-section">
        <div className="container pr">
          <h5>Bag(1)</h5>
          <div className="bag-items">
            <div className='first'>
              {
                value.map(val => {
                  const { name, price, newPrice, image } = val;
                  return (
                    <CartCard data={{ name, price, newPrice, image }} />
                  )
                })
              }
            </div>
            <div className="price-details">
              <PriceCard />
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Cart;
