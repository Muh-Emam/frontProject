import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem(user))
}

const userSlice = createSlice({
    name: user,
    initialState,

})