import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import storage from "@react-native-async-storage/async-storage";

import { User } from "../types";

export interface UserState {
  currentUser: User | null;
  users: User[];
  token:string | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  token:null
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addAllUsers: (state: UserState, action: PayloadAction<User[]>): void => {
      state.users = action.payload;
    },
    setCurrentUser: (state: UserState, action: PayloadAction<User>): void => {
      state.currentUser = action.payload;
    },
    setToken: (state: UserState, action: PayloadAction<string>): void => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      storage.removeItem("persist:root");
    });
  },
});

// Action creators are generated for each case reducer function
export const { addAllUsers, setCurrentUser,setToken } = usersSlice.actions;

export default usersSlice.reducer;
