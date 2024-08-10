import { createSlice } from "@reduxjs/toolkit";

export interface Iuser {
  id: number;
  fullname: string;
  email: string;
  password: string;
}

const initialState: {
  currentUser: Iuser | null;
} = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signInSuccess, signOutSuccess } = userSlice.actions;
export default userSlice.reducer;
