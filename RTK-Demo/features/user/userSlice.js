import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  users: [],
  error: "",
};
// createAsyncThunk will automatically handle error and also it will automatically dispatch lifecycle action
// based on the return promise, a promise is either pending, fulfilled or rejected
// thats why createAsyncThunk will generate three action types and action types have to added as extrareducers
// createAsyncThunk in behind the scenes used redux-thunk library
//async action, lec 24
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users");
  return response.data.map((user) => user.id);
});
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false,
        state.users = action.payload,
        state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false,
        state.users = [],
        state.error = action.error.message;
    });
  },
});
export default userSlice.reducer;
