import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./type";

export const initialState: UserState = {
  user: null,
  phoneNumber: undefined,
  name: undefined,
  code: undefined,
  isConfirm: false,
  auth: null,
  profile_image: null,
  profileData: {},
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

    setProfileImage: (state, action: PayloadAction<File>) => {
      state.profile_image = action.payload;
    },
    setProfileData(state, action: PayloadAction<Record<string, any>>) {
      state.profileData = { ...state.profileData, ...action.payload };
    },
  },
});

export const {
  setPhoneNumber,
  setName,
  setCode,
  setIsConfirm,
  setAuthenticated,
  setProfileImage,
  setProfileData,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
