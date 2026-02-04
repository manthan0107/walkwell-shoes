import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    userList: [],
};

export const fetchAllUsers = createAsyncThunk(
    "/users/fetchAllUsers",
    async () => {
        const response = await axios.get(
            "http://localhost:5000/api/admin/users/get"
        );

        return response.data;
    }
);

const adminUsersSlice = createSlice({
    name: "adminUsers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userList = action.payload.data;
            })
            .addCase(fetchAllUsers.rejected, (state) => {
                state.isLoading = false;
                state.userList = [];
            });
    },
});

export default adminUsersSlice.reducer;
