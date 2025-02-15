import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    email: string | null;
    token: string | null;
}

const initialState: UserState = {
    email: null,
    token: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ email: string; token: string }>) => {
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.email = null;
            state.token = null;
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
