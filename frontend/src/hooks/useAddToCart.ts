import { useRecoilState, useSetRecoilState } from "recoil"
import { cartState } from "../state/atoms"



export const useAddToCart = (data) => {
    //  const setState= useSetRecoilState(cartState)
    const [state, setState] = useRecoilState(cartState);
    const existingProduct = state.find((val) => val.id === data.id);
    if (existingProduct) {
        const updatedData = state.map((val) => {
            if (val.id === data.id) {
                return { ...val, count: val.count + 1 };
            }
            return val;
        });
        // state.data = updatedData;
        setState(updatedData)
    } else {
        //    setState([...state,data])
        const newState = [...state].push({ ...data, count: 1 })
        setState(newState)
    }
    return;
}

//cart add -->item into cart
//
