import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './features/user-slice.jsx'
import cartReducer from './features/cart-slice.jsx';

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
})

export default rootReducer