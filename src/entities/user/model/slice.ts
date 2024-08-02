import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./type";

export const initialState: UserState = {
  user: null,
  phoneNumber: "",
  name: "",
  code: "",
  isConfirm: false,
  auth: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.auth = action.payload;
    },
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setCode(state, action: PayloadAction<string>) {
      state.code = action.payload;
    },
    setIsConfirm(state, action: PayloadAction<boolean>) {
      state.isConfirm = action.payload;
    },
  },
});

export const {
  setPhoneNumber,
  setName,
  setCode,
  setIsConfirm,
  setAuthenticated,
} = userSlice.actions;
export default userSlice.reducer;
