
import { ApiResponse } from "@/interfaces";

class WishlistUtils {
    addRemoveFromWishlist = (recoilState, data: Partial<ApiResponse>) => {
        const [state, setState] = recoilState;
        const isStateEmpty = state.length === 0;
        if (isStateEmpty) {
            // setState((prev) => [...prev, { ...data, count: 1 }])//if not
            setState([data])
            return;
        }
        const existingProduct = state.find((val) => val._id === data._id);

        if (existingProduct) {
            setState(prev => {
                return prev.filter(val => val._id !== data._id)
            })
        } else {
            setState((prev) => [...prev, { ...data }])//if not
        }
    }
}

const Wishlist = new WishlistUtils();
export const addRemoveFromWishlist = Wishlist.addRemoveFromWishlist;

