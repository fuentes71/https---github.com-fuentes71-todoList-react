import { combineReducers } from "@reduxjs/toolkit";

import accountsSlice from "./accountsSlice";
import { userLoggedReducer } from "./userLoggedSlice";

export default combineReducers({
    accounts: accountsSlice,
    userLogged: userLoggedReducer,
});
