

import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'


export const store = configureStore({
    reducer: {
        cart: cartSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch