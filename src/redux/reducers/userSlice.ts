import { createSlice } from "@reduxjs/toolkit";

export interface userData {
  email: string;
  name: string;
}
const INITIAL_STATE = {
  data: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    clearUser: (state) => {
      state.data = null;
    },
  },
});

export const { setUser, clearUser } = UserSlice.actions;


export default UserSlice.reducer;
