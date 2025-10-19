import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
   name: "user",
   initialState: {
      userData: null
   },
   reducers: {
      setUserData: (state, action) => {
         state.userData = action.payload;
      },
   }
});

export const { setUserData, logoutUser } = userSlice.actions;
export default userSlice.reducer;
