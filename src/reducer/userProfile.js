import { createSlice } from '@reduxjs/toolkit';

const userProfile = createSlice({
  name: 'user',
  initialState: null, 
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    clearUser: () => null,
  },
});

export const { setUser, clearUser } = userProfile.actions;
export default userProfile.reducer;