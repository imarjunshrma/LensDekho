import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { BsBookmarkHeart } from "react-icons/bs";
import '@/styles/pages/cart.scss';
import { useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState } from '@/state/atoms';
import { addToCart, removeItemFromCart, removeToCart } from '@/utils/cartUtiles';
import EmptyCard from '@/components/EmptyCard';


const CartCard = (data) => {
  // console.log(data)
  const state = useRecoilState(cartState)
  const { image, name, price, newPrice, count, _id } = data.data;

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
              <span onClick={() => removeToCart(state, data.data)}>
                <i><AiOutlineMinus /></i>
              </span>
              <span className='count'>
                {count}
              </span>
              <span onClick={() => addToCart(state, data.data)}>
                <i><AiOutlinePlus /></i>
              </span>

            </div>
          </div>
          <div className="last">
            <button className="rm-bag" onClick={() => removeItemFromCart(state, _id)}>
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
    const total = data?.reduce((current, val) => current + val.count * val.newPrice, 0)
    return total;
  }, [data]);
  // console.log(total)
  return (
    <div className='price-card'>
      <h4>Price Details</h4>
      {
        data?.map((val, index) => {
          const { name, newPrice, count } = val;
          return (
            <div key={index}>
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
  const value = useRecoilValue(cartState);
  const [state] = useRecoilState(cartState)
  return (
    <>
      <div className="cart-section">
        <div className="container pr">
          {
            state.length ? (
              <>
                <h5>Bag({value.length})</h5>
                <div className="bag-items">
                  <div className='first cartcardwrap'>
                    {
                      value?.map((val, index) => {
                        const { name, price, newPrice, image, count, _id } = val;
                        return (
                          <CartCard data={{ name, price, newPrice, image, count, _id }} key={index}
                          />
                        )
                      })
                    }
                  </div>
                  <div className="price-details">
                    <PriceCard data={value} />

                  </div>
                </div>

              </>
            ) : <EmptyCard />
          }

        </div>
      </div>
    </>
  )
};

export default Cart;
