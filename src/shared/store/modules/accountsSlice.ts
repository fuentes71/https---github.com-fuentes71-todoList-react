import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { userProps } from "../../types";

const accountAdapter = createEntityAdapter<userProps>({ selectId: ({ email }) => email });

const accountSlice = createSlice({
    name: "account",
    initialState: accountAdapter.getInitialState(),
    reducers: {
        addAccount: accountAdapter.addOne,
        updateAccount: accountAdapter.updateOne,
    },
});

export default accountSlice.reducer;
export const { addAccount, updateAccount } = accountSlice.actions;
