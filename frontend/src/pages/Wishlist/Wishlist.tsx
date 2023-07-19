import Card from "../../components/ProductCard/Card";
import './style.css';

const Wishlist = () => {
    return (
        <>
            <div className="wishlist-container">
                <div className="container">
                    <div className="p-cards_">
                        <h3 className="heading">Wishlist !</h3>
                        <div className="row">
                            <div className="col-lg-3 px-0">
                                <Card />
                            </div>
                            <div className="col-lg-3 px-0">
                                <Card />
                            </div>
                            <div className="col-lg-3 px-0">
                                <Card />
                            </div>
                            <div className="col-lg-3 px-0">
                                <Card />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
};

export default Wishlist;
