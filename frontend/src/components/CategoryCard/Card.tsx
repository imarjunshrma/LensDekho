import { useNavigate } from 'react-router-dom';
import './style.css';
interface Props {
  title: string,
  img: string
}
const Card = ({ title, img }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="c-card" onClick={() => navigate('/products')}>
      <div className="overlay">
      </div>
      <div className="image">
        <img src={img} alt="" />
      </div>
      <div className="content">
        <h3>{title}</h3>
      </div>
    </div>
  )
};

export default Card;
