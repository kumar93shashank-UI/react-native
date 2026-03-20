import { User } from "@/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const res = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users");
    return res.data;
})

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.error = "Failed to fetch users";
                state.loading = false;
            })
    }
})
export default usersSlice.reducer;