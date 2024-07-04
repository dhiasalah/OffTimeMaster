import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { demandeReducer } from "./demandeSlice";
import { successReducer } from "./successSlice";
export const store = configureStore({
  reducer: {
    userState: userReducer,
    demandeState: demandeReducer,
    successState: successReducer,
  },
});
