import { AiOutlinePlus } from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";
import './style.css'
import { NavigateFunction, useNavigate } from "react-router-dom";
interface Props {
  name: string,
  category: string,
  price: string,
  image: string,
  id: string
}
const Cards = ({ name, category, price, image, id }: Props) => {
  const navigate: NavigateFunction = useNavigate()
  const onClick = (id: string) => {
    // console.log(id)
    navigate(`/products/${id}`)
  }
  return (
    <div className="p-card" onClick={() => onClick(id)}>
      <div>
        <div className='heading'>
          <p>{name}</p>
          <div>
            <p className="price">
              <i>
                <BsCurrencyRupee />
              </i>
              {price}
            </p>
            <i className="plus-icon">
              <AiOutlinePlus />
            </i>
          </div>
        </div>
        <div className="category">
          {category}
        </div>
        <div className="img">
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  )
};

export default Cards;
