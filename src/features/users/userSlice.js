import { createSlice } from "@reduxjs/toolkit";
import { User } from "./user";

const userInitialState = {
    pseudo: '',
    token: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        setConnectedUser: (state, action) => {
            state.pseudo = action.payload.pseudo;
            state.token = action.payload.token;
        }
    }
});

export const getConnectedUser = state => new User(state.pseudo, state.token);

export const { setConnectedUser } = userSlice.actions;

export default userSlice.reducer;
