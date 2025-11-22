import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ExerciseMatching from "../../components/ExerciseMatching";
import ExerciseMultipleChoice from "../../components/ExerciseMultipleChoice";
import ExerciseTranslation from "../../components/ExerciseTranslation";
import ProgressBar from "../../components/ProgressBar";
import { Colors } from "../../constants/colors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { completeLesson } from "../../store/slices/progressSlice";
import { Lesson } from "../../types/types";
import {
  loadSounds,
  playCompleteSound,
  unloadSounds,
} from "../../utils/sounds";

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { units } = useAppSelector((state) => state.lessons);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Load sounds when component mounts
    loadSounds();

    // Find the lesson by id
    for (const unit of units) {
      const foundLesson = unit.lessons.find((l) => l.id === id);
      if (foundLesson) {
        setLesson(foundLesson);
        break;
      }
    }

    // Cleanup sounds when component unmounts
    return () => {
      unloadSounds();
    };
  }, [id, units]);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.errorText}>Lesson not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentExercise = lesson.exercises[currentExerciseIndex];
  const progress = (currentExerciseIndex + 1) / lesson.exercises.length;

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }

    // Move to next exercise or show results
    setTimeout(() => {
      if (currentExerciseIndex < lesson.exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
      } else {
        // Lesson complete
        const score = Math.round(
          ((correctAnswers + (isCorrect ? 1 : 0)) / lesson.exercises.length) *
            100
        );

        // Play celebration sound
        playCompleteSound();

        dispatch(
          completeLesson({
            lessonId: lesson.id,
            score,
            xpReward: lesson.xpReward,
          })
        );
        setShowResults(true);
      }
    }, 500);
  };

  const handleClose = () => {
    router.back();
  };

  const handleContinue = () => {
    router.back();
  };

  const renderExercise = () => {
    switch (currentExercise.type) {
      case "multipleChoice":
        return (
          <ExerciseMultipleChoice
            key={currentExercise.id}
            question={currentExercise.question}
            options={currentExercise.options || []}
            correctAnswer={currentExercise.correctAnswer}
            onAnswer={handleAnswer}
          />
        );
      case "translation":
        return (
          <ExerciseTranslation
            key={currentExercise.id}
            question={currentExercise.question}
            words={currentExercise.words || []}
            correctAnswer={currentExercise.correctAnswer}
            onAnswer={handleAnswer}
          />
        );
      case "matching":
        return (
          <ExerciseMatching
            key={currentExercise.id}
            question={currentExercise.question}
            pairs={currentExercise.pairs || []}
            onAnswer={handleAnswer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <ProgressBar progress={progress} />
        </View>
      </View>

      <View style={styles.content}>{renderExercise()}</View>

      <Modal visible={showResults} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.resultsCard}>
            <Text style={styles.resultsTitle}>Lesson Complete! 🎉</Text>
            <Text style={styles.resultsSubtitle}>{lesson.title}</Text>

            <View style={styles.resultsStats}>
              <View style={styles.resultStat}>
                <Text style={styles.resultStatValue}>
                  {correctAnswers}/{lesson.exercises.length}
                </Text>
                <Text style={styles.resultStatLabel}>Correct</Text>
              </View>

              <View style={styles.resultStat}>
                <Text style={styles.resultStatValue}>+{lesson.xpReward}</Text>
                <Text style={styles.resultStatLabel}>XP Earned</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: Colors.error,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 20,
    color: Colors.textSecondary,
  },
  progressContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  resultsCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 32,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  resultsTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  resultsSubtitle: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 32,
  },
  resultsStats: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 32,
  },
  resultStat: {
    alignItems: "center",
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 16,
    minWidth: 120,
  },
  resultStatValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 4,
  },
  resultStatLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 16,
    width: "100%",
  },
  continueButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
