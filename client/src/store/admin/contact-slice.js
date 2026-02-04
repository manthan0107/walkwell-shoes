import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    contactList: [],
};

export const getContacts = createAsyncThunk(
    "/contact/getContacts",
    async () => {
        const response = await axios.get(
            "http://localhost:5000/api/admin/contact/get"
        );

        return response.data;
    }
);

const adminContactSlice = createSlice({
    name: "adminContact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getContacts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getContacts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contactList = action.payload.data;
            })
            .addCase(getContacts.rejected, (state) => {
                state.isLoading = false;
                state.contactList = [];
            });
    },
});

export default adminContactSlice.reducer;
