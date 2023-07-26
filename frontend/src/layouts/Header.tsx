import './Header.css';
import { HiOutlineShoppingBag } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { BsBookmarkHeart } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const value = useSelector(state => state.cart.data)
    // console.log(value)
    const navigate = useNavigate();
    return (
        <header className="header">
            <nav className="container nav_ pr">
                <div className="logo">
                    <img src="https://eyesome.netlify.app/static/media/defaultUser.8fe8d848d6ce42e30435.png" alt="" />
                </div>
                <div className="search-box">
                    <form action="">
                        <input type="search" name="" id="" placeholder='Search Glasses....' />
                        <i className="search-icon">
                            <CiSearch />
                        </i>
                    </form>
                </div>
                <div className="items_">
                    <div className='explore_div'>
                        <button className="explore" onClick={() => navigate("/products")}>
                            Products
                        </button>
                    </div>

                    <ul className="items">
                        <li className="wishlist">
                            <BsBookmarkHeart />
                        </li>
                        <li>
                            {/* <span>
                                {value.length}
                            </span> */}
                            <i className="cart" onClick={() => navigate('/cart')}>
                                <HiOutlineShoppingBag />
                            </i>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
};

export default Header;
