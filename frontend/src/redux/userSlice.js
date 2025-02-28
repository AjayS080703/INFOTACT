import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { users: [] },
  reducers: {
    setUsers: (state, action) => { state.users = action.payload; },
    addUser: (state, action) => { state.users.push(action.payload); },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const { setUsers, addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;