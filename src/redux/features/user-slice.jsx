import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLogin: false,
  role: ""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
       addUser: (state, action) => {
       state.data = action.payload.data;
       state.isLogin = true;
       state.role = action.payload.data?.role;
    },
    removeUser: (state, action) => {
        state.data = [];
        state.isLogin = false;
    }
}
})

export const { addUser, removeUser } = userSlice.actions
export default userSlice.reducer