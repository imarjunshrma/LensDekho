import { ApiResponse } from "../components/ProductCard/ProductCard";

class CartUtils {
    addToCart = (recoilState, data: ApiResponse) => {
        const [state, setState] = recoilState;
        const isStateEmpty = state.length === 0;
        if (isStateEmpty) {
            setState((prev) => [...prev, { ...data, count: 1 }])//if not
            return;
        }
        const existingProduct = state.find((val) => val._id === data._id);

        if (existingProduct) {
            setState((prev) => {
                return prev.map((val) => {
                    if (val._id === data._id) {
                        return { ...val, count: val.count + 1 }
                    }
                    return val;
                })
            })
        } else {
            setState((prev) => [...prev, { ...data, count: 1 }])//if not
        }
    }
    removeToCart = (recoilState, data: ApiResponse) => {
        const [state, setState] = recoilState;
        const isStateEmpty = state.length === 0;
        if (isStateEmpty) return;
        const existingProduct = state.find((val) => val._id === data._id);
        if (!existingProduct) return;
        const updatedData = state.map(val => {
            if (val._id === data._id) {
                if (val.count >= 1) {
                    return { ...val, count: val.count - 1 }
                } else {
                    return;
                }
            }
            return val;
        })
        const latestUpdated = updatedData.filter(val => val.count > 0)
        setState(latestUpdated)

    }
    removeItemFromCart = (recoilState, _id: Partial<ApiResponse>) => {
        const [state, setState] = recoilState;
        const isStateEmpty = state.length === 0;
        if (isStateEmpty) return;
        setState(prev => {
            return prev.filter(val => val._id !== _id)
        })

    }
}

const cart = new CartUtils();
export const addToCart = cart.addToCart;
export const removeToCart = cart.removeToCart;
export const removeItemFromCart = cart.removeItemFromCart;

