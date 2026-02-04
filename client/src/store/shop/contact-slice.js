
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
};

export const addContact = createAsyncThunk(
    "/contact/addContact",
    async (formData) => {
        const response = await axios.post(
            "http://localhost:5000/api/shop/contact/add",
            formData
        );

        return response.data;
    }
);

const shopContactSlice = createSlice({
    name: "shopContact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addContact.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addContact.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addContact.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default shopContactSlice.reducer;
