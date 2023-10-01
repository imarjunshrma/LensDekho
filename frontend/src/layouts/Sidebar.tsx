import '@/styles/layouts/sidebar.scss';
import { Dispatch, SetStateAction } from 'react'
// import { IoCloseOutline } from 'react-icons/io5'
import { MdOutlineClose } from 'react-icons/md'
import { QueryTuple } from '../../pages/Product/Product';
interface Query {
    gender: string,
    category: string,
    rating: string,
    price: string
}
const Sidebar = ({ setIsOpenSidebar, query, setQuery }: { setIsOpenSidebar: Dispatch<SetStateAction<boolean>>, query: QueryTuple, setQuery: Dispatch<SetStateAction<Query>> }) => {


    const onClick = () => {
        setQuery({
            gender: "All",
            category: "",
            rating: "",
            price: ""
        })
    }

    // console.log(query)
    return (
        <div className="sidebar">
            <div className='main'>
                <div className="head_">
                    <h3>Filter Products</h3>

                    <i onClick={() => setIsOpenSidebar(false)}>
                        <MdOutlineClose />
                    </i>

                </div>
                <div className="clear btn">
                    <button onClick={onClick}>Clear</button>
                </div>
                <div>
                    <h5>Gender</h5>
                    <div className='btn-grp btn'>
                        <button onClick={() => setQuery({ ...query, gender: 'All', })} className={query.gender == "All" && "gender-active"}>All</button>
                        <button onClick={() => setQuery({ ...query, gender: 'Men' })} className={query.gender == "Men" && "gender-active"}>Men</button>
                        <button onClick={() => setQuery({ ...query, gender: 'Women' })} className={query.gender == "Women" && "gender-active"}>Women</button>
                        <button onClick={() => setQuery({ ...query, gender: 'Unisex' })} className={query.gender == "Unisex" && "gender-active"}>Unisex</button>
                    </div>
                </div>
                <div className='price-range'>
                    <h5>Price Range</h5>
                    <input type="range" name="" id=""
                        value={query.price}
                        onChange={(e) => setQuery({ ...query, price: e.target.value })}
                        min="0"
                        max="4999"
                    />
                    <div className="range-between">
                        <span>0</span>
                        <span>2499</span>
                        <span>4999</span>
                    </div>
                </div>
                <div className="ctgry">
                    <h5>Category</h5>
                    <div>
                        <div>
                            <input type="radio" name="vision" id="vision1" value="Vision" checked={query.category === "Vision"} onChange={(e) => setQuery({ ...query, category: e.target.value })} />
                            <label htmlFor="vision1">Vision</label>
                        </div>
                        <div>
                            <input type="radio" name="vision" id="vision2" value="Sunglasses" checked={query.category === "Sunglasses"} onChange={(e) => setQuery({ ...query, category: e.target.value })} />
                            <label htmlFor="vision2">Sunglasses</label>
                        </div>
                        <div>
                            <input type="radio" name="vision" id="vision3" value="Sports" checked={query.category === "Sports"} onChange={(e) => setQuery({ ...query, category: e.target.value })} />
                            <label htmlFor="vision3">Sports</label>
                        </div>
                    </div>

                </div>
                <div className="ratings">
                    <h5>Ratings</h5>
                    <div>
                        <div>
                            <input type="radio" name="radio" id="radio1" value={1} checked={query.rating == String(1)} onChange={(e) => console.log(e.target.value)} />
                            <label htmlFor="radio1">1 Stars & above</label>
                        </div>
                        <div>
                            <input type="radio" name="radio" id="radio2" value={2} checked={query.rating == String(2)} onChange={(e) => setQuery({ ...query, rating: e.target.value })} />
                            <label htmlFor="radio2">2 Stars & above</label>
                        </div>
                        <div>
                            <input type="radio" name="radio" id="radio3" value={3} checked={query.rating == String(3)} onChange={(e) => setQuery({ ...query, rating: e.target.value })} />
                            <label htmlFor="radio3">3 Stars & above</label>
                        </div>
                        <div>
                            <input type="radio" name="radio" id="radio4" value={4} checked={query.rating == String(4)} onChange={(e) => setQuery({ ...query, rating: e.target.value })} />
                            <label htmlFor="radio4">4 Stars & above</label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default Sidebar;
