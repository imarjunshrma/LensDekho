import { useNavigate } from 'react-router-dom';
import "@/styles/components/categoryCard.scss";
import { CategoryCardProps } from '@/interfaces';

const Card = ({ title, img }: CategoryCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="c-card" onClick={() => navigate('/products', {
      state: {
        title
      }
    })}>
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
