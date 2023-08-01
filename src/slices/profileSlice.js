import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
}

// ye slice hume btaayegi ki user instructor hai ki student hai usko check krne k liye

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload
        },
    }
})

export const {setUser, setLoading} = profileSlice.actions;
export default profileSlice.reducer;