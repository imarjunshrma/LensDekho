import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { ApiResponse } from "../components/ProductCard/Card";
interface InitialState {
    data: ApiResponse | []
}
const initialState: InitialState = {
    data: []
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToBag: (state, action: PayloadAction<unknown>) => {
            if (!state.data.length) {
                let nx = { ...action.payload, count: 1 }
                state.data.push(action.payload);
                return;
            }
            //
            for (let val of state.data) {
                if (val.id === action.payload.id) {
                    let cx = val.count;
                    console.log(cx)
                    val.count = cx + 1;
                } else {
                    let nx = { ...action.payload, count: 1 }
                    state.data.push(action.payload);
                }
            }

        },
        removeToBag: (state, action: PayloadAction<unknown>) => {
            const nxState = state.data.filter(val => val.id !== action.id)
            state.data.length = 0;
            state.data.push(nxState);
        }
    }
})

export default cartSlice.reducer;
export const { addToBag, removeToBag } = cartSlice.actions;