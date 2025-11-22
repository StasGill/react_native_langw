export type ExerciseType = "multipleChoice" | "translation" | "matching";

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  correctAnswer: string;
  options?: string[]; // For multiple choice
  words?: string[]; // For translation (word bank)
  pairs?: { polish: string; english: string }[]; // For matching
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  xpReward: number;
  exercises: Exercise[];
  requiredLessonId?: string; // Previous lesson that must be completed
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  color: string;
  lessons: Lesson[];
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  score: number;
  completedAt?: string;
}

export interface UserProgress {
  completedLessons: string[];
  xp: number;
  level: number;
  streak: number;
  lastCompletedDate?: string;
  lessonProgress: { [lessonId: string]: LessonProgress };
}

export interface UserProfile {
  name: string;
  avatar: string;
  dailyGoal: number;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
}
