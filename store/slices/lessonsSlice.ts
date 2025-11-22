import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { polishUnits } from "../../data/polishLessons";
import { Unit } from "../../types/types";

interface LessonsState {
  units: Unit[];
  currentLessonId: string | null;
}

const initialState: LessonsState = {
  units: polishUnits,
  currentLessonId: null,
};

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    setCurrentLesson: (state, action: PayloadAction<string>) => {
      state.currentLessonId = action.payload;
    },
    clearCurrentLesson: (state) => {
      state.currentLessonId = null;
    },
  },
});

export const { setCurrentLesson, clearCurrentLesson } = lessonsSlice.actions;
export default lessonsSlice.reducer;
