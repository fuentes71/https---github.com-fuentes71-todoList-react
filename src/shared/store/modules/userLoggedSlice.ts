import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    conected: false,
    value: "",
};

const userLogged = createSlice({
    name: "userLogged",
    initialState,
    reducers: {
        saveUser: (_, action) => ({ conected: true, value: action.payload }),
        logoutUser: () => ({
            conected: false,
            value: "",
        }),
    },
});
export const { saveUser, logoutUser } = userLogged.actions;
export const userLoggedReducer = userLogged.reducer;
