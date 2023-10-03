import '@/styles/layouts/header.scss';
import { HiOutlineShoppingBag } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { BsBookmarkHeart } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState, inputValue, searchResultState, wishListState } from '../state/atoms';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/constant/apiConstant';
import { Link } from 'react-router-dom';
const Header = () => {
    const value = useRecoilValue(cartState);
    const wishList = useRecoilValue(wishListState);
    const navigate = useNavigate();
    const [timer, setTimer] = useState(null);
    const [input, setInput] = useRecoilState(inputValue);
    const [, setSearchResult] = useRecoilState(searchResultState);
    const location = useLocation();
    const makeApiCall = async () => {
        const res = await axios.get(`${API_URL}/lens/search?name=${input}`);
        setSearchResult(res.data);
        if (location.pathname !== "/products") {
            navigate("/products")
        }
        //.data
    }
    useEffect(() => {
        if (!input.length) return;
        if (timer) {
            clearTimeout(timer); // Clear any previous timer
        }
        // Set a new timer to make the API call after 1000 milliseconds (1 seconds)
        const newTimer = setTimeout(() => {
            // Call your API function here
            makeApiCall();
        }, 900);
        // Update the timer state with the new timer
        setTimer(newTimer);
        // Clean up the timer when the component unmounts
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [input]);

    return (
        <header className="header">
            <nav className="container nav_ pr">
                <Link className="logo" to="/">
                    <img src="/avtaar.svg" alt="" />
                </Link>
                <div className="search-box">
                    <div>
                        <input type="search" name="" id="" placeholder='Search Glasses....'
                            value={input}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                        />
                        <i className="search-icon">
                            <CiSearch />
                        </i>
                    </div>
                </div>
                <div className="items_">
                    <div className='explore_div'>
                        <button className="explore" onClick={() => navigate("/products")}>
                            Products
                        </button>
                    </div>

                    <ul className="items">
                        <li >
                            <span>
                                {wishList.length}
                            </span>
                            <i className="wishlist" onClick={() => navigate("/wishlist")}>
                                <BsBookmarkHeart />
                            </i>
                        </li>
                        <li>
                            <span>
                                {value.length}
                            </span>
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
