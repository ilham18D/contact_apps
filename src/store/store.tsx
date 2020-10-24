import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {contactSlice} from "./content";

export const rootReducer = combineReducers({
    contac: contactSlice.reducer
});
export const store = configureStore({
    reducer: rootReducer
});