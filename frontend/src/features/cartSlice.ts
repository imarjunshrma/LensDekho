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
            const existingProduct = state.data.find((val) => val.id === action.payload.id);

            if (existingProduct) {
                const updatedData = state.data.map((val) => {
                    if (val.id === action.payload.id) {
                        return { ...val, count: val.count + 1 };
                    }
                    return val;
                });
                state.data = updatedData;
            } else {
                state.data.push({ ...action.payload, count: 1 });
            }

        },
        removeToBag: (state, action: PayloadAction<unknown>) => {
            if (!state.data.length) return;
            const existingProduct = state.data.find((val) => val.id === action.payload.id);
            if (!existingProduct) return;
            // let updatedData = state.data.filter(val => val.id !== action.payload.id)
            const updatedData = state.data.map(val => {
                if (val.id === action.payload.id) {
                    if (val.count >= 1) {
                        return { ...val, count: val.count - 1 }
                    }
                    return;
                    // return {...val,val.count>1?val.count-1:0}
                }
            })
            state.data = updatedData;
        },
        removeItemFromBag: (state, action: PayloadAction<unknown>) => {
            if (!state.data.length) return;
            const existingProduct = state.data.find((val) => val.id === action.payload);
            // console.log(existingProduct)
            // console.log(action.payload)
            if (!existingProduct) return;
            const updatedData = state.data.filter(val => val.id !== action.payload);
            // console.log(updatedData)
            state.data = updatedData
        }
    }
})

export default cartSlice.reducer;
export const { addToBag, removeToBag, removeItemFromBag } = cartSlice.actions;