import {ObjectModelContact} from "../api"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState:ObjectModelContact[]= []
export const contactSlice = createSlice({
    name: "contactSlice",
    initialState: initialState,
    reducers: {
        contactAddMany(state, action: PayloadAction<ObjectModelContact[]>) {
            state = action.payload;
            return state;
        },
        contactAdd(state, action: PayloadAction<ObjectModelContact>) {
            state =[action.payload, ...state];
            return state;
        },
        contacUpdate(state, action: PayloadAction<ObjectModelContact>){
            const idx = state.findIndex(it => it.id === action.payload.id);
            if (idx > -1) state[idx] = action.payload;
            return state;
        },
        contactDelete(state, action: PayloadAction<ObjectModelContact>){
            const idx = state.findIndex(it => it.id === action.payload.id);
            if (idx > -1) state.splice(idx, 1);
            return state;
        },
    }
})
export const {
    contactAddMany,
    contactAdd,
    contacUpdate,
    contactDelete
} = contactSlice.actions;