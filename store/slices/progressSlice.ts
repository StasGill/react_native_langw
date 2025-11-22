import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProgress } from "../../types/types";

const initialState: UserProgress = {
  completedLessons: [],
  xp: 0,
  level: 1,
  streak: 0,
  lessonProgress: {},
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    completeLesson: (
      state,
      action: PayloadAction<{
        lessonId: string;
        score: number;
        xpReward: number;
      }>
    ) => {
      const { lessonId, score, xpReward } = action.payload;

      // Add to completed lessons if not already there
      if (!state.completedLessons.includes(lessonId)) {
        state.completedLessons.push(lessonId);
      }

      // Update lesson progress
      state.lessonProgress[lessonId] = {
        lessonId,
        completed: true,
        score,
        completedAt: new Date().toISOString(),
      };

      // Add XP
      state.xp += xpReward;

      // Calculate level (every 50 XP = 1 level)
      state.level = Math.floor(state.xp / 50) + 1;

      // Update streak
      const today = new Date().toDateString();
      const lastCompleted = state.lastCompletedDate
        ? new Date(state.lastCompletedDate).toDateString()
        : null;

      if (lastCompleted === today) {
        // Already completed today, don't change streak
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        if (lastCompleted === yesterdayStr) {
          // Completed yesterday, increment streak
          state.streak += 1;
        } else if (!lastCompleted) {
          // First time completing
          state.streak = 1;
        } else {
          // Streak broken, reset to 1
          state.streak = 1;
        }
      }

      state.lastCompletedDate = new Date().toISOString();
    },
    resetProgress: (state) => {
      return initialState;
    },
  },
});

export const { completeLesson, resetProgress } = progressSlice.actions;
export default progressSlice.reducer;
