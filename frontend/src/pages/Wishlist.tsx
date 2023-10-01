import { useRecoilState } from "recoil";
import Card, { ApiResponse } from "@/components/ProductCard";
import '@/styles/pages/wishlist.scss';
import { wishListState } from "@/state/atoms";

const Wishlist = () => {
    const [state] = useRecoilState(wishListState)
    return (
        <>
            <div className="wishlist-container">
                <div className="container">
                    <div className="p-cards_">
                        <h3 className="heading">Wishlist !</h3>
                        <div className="row">
                            {
                                state.map((data: ApiResponse) => (
                                    <div className="col-lg-3 px-0">
                                        <Card {...data} />
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
};

export default Wishlist;
