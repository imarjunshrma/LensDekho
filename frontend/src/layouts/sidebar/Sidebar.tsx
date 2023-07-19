import './style.css';
import { Dispatch, SetStateAction } from 'react'
// import { IoCloseOutline } from 'react-icons/io5'
import { MdOutlineClose } from 'react-icons/md'
const Sidebar = ({ setIsOpenSidebar, filterByQuery }: { setIsOpenSidebar: Dispatch<SetStateAction<boolean>>, filterByQuery: string }) => {
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
                    <button>Clear</button>
                </div>
                <div>
                    <h5>Gender</h5>
                    <div className='btn-grp btn'>
                        <button onClick={() => filterByQuery({ gender: 'All' })} className={``}>All</button>
                        <button onClick={() => filterByQuery({ gender: 'Men' })} className={``}>Men</button>
                        <button onClick={() => filterByQuery({ gender: 'Women' })} className={``}>Women</button>
                        <button onClick={() => filterByQuery({ gender: 'Unisex' })} className={``}>Unisex</button>
                    </div>
                </div>
                <div className='price-range'>
                    <h5>Price Range</h5>
                    <input type="range" name="" id="" />
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
                            <input type="radio" name="vision" id="vision1" value="Vision" onChange={(e) => filterByQuery({ category: e.target.value })} />
                            <label htmlFor="vision1">Vision</label>
                        </div>
                        <div>
                            <input type="radio" name="vision" id="vision2" value="Sunglasses" onChange={(e) => filterByQuery({ category: e.target.value })} />
                            <label htmlFor="vision2">Sunglasses</label>
                        </div>
                        <div>
                            <input type="radio" name="vision" id="vision3" value="Sports" onChange={(e) => filterByQuery({ category: e.target.value })} />
                            <label htmlFor="vision3">Sports</label>
                        </div>
                    </div>

                </div>
                <div className="ratings">
                    <h5>Ratings</h5>
                    <div>
                        <div>
                            <input type="radio" name="radio" id="radio1" value={1} onChange={(e) => console.log(e.target.value)} />
                            <label htmlFor="radio1">1 Stars & above</label>
                        </div>
                        <div>
                            <input type="radio" name="radio" id="radio2" value={2} onChange={(e) => filterByQuery({ rating: e.target.value })} />
                            <label htmlFor="radio2">2 Stars & above</label>
                        </div>
                        <div>
                            <input type="radio" name="radio" id="radio3" value={3} onChange={(e) => filterByQuery({ rating: e.target.value })} />
                            <label htmlFor="radio3">3 Stars & above</label>
                        </div>
                        <div>
                            <input type="radio" name="radio" id="radio4" value={4} onChange={(e) => filterByQuery({ rating: e.target.value })} />
                            <label htmlFor="radio4">4 Stars & above</label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default Sidebar;
