import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "../../types/types";

const initialState: UserProfile = {
  name: "Learner",
  avatar: "👤",
  dailyGoal: 50,
  soundEnabled: true,
  notificationsEnabled: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      return { ...state, ...action.payload };
    },
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
    },
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
  },
});

export const { updateProfile, toggleSound, toggleNotifications } =
  userSlice.actions;
export default userSlice.reducer;
