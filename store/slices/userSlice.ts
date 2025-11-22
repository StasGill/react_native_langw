import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "../../types/types";

const initialState: UserProfile = {
  name: "Learner",
  avatar: "👤",
  dailyGoal: 50,
  soundEnabled: true,
  notificationsEnabled: true,
  sourceLanguage: "en",
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
    setSourceLanguage: (state, action: PayloadAction<"en" | "ua">) => {
      state.sourceLanguage = action.payload;
    },
  },
});

export const {
  updateProfile,
  toggleSound,
  toggleNotifications,
  setSourceLanguage,
} = userSlice.actions;
export default userSlice.reducer;
