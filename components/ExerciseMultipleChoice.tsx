import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "../hooks/useTranslation";
import { playCorrectSound, playIncorrectSound } from "../utils/sounds";

interface ExerciseMultipleChoiceProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onAnswer: (isCorrect: boolean) => void;
}

export default function ExerciseMultipleChoice({
  question,
  options,
  correctAnswer,
  onAnswer,
}: ExerciseMultipleChoiceProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const t = useTranslation();
  const { colors } = useTheme();

  const handleSelect = (option: string) => {
    if (hasAnswered) return;
    setSelectedOption(option);
  };

  const handleCheck = () => {
    if (hasAnswered || !selectedOption) return;

    setHasAnswered(true);
    const isCorrect = selectedOption === correctAnswer;

    // Play sound
    if (isCorrect) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }

    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1000);
  };

  const getOptionStyle = (option: string) => {
    const baseStyle = [
      styles.option,
      { backgroundColor: colors.surface, borderColor: colors.border },
    ];

    if (!hasAnswered) {
      return option === selectedOption
        ? [
            ...baseStyle,
            styles.selected,
            {
              borderColor: colors.primary,
              backgroundColor: colors.secondary,
            },
          ]
        : baseStyle;
    }

    if (option === correctAnswer) {
      return [
        ...baseStyle,
        styles.correct,
        { backgroundColor: "#D7FFD7", borderColor: colors.success },
      ];
    }
    if (option === selectedOption && option !== correctAnswer) {
      return [
        ...baseStyle,
        styles.incorrect,
        { backgroundColor: "#FFD7D7", borderColor: colors.error },
      ];
    }
    return [...baseStyle, styles.disabled];
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.question, { color: colors.text }]}>{question}</Text>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getOptionStyle(option)}
            onPress={() => handleSelect(option)}
            disabled={hasAnswered}
            activeOpacity={0.7}
          >
            <Text style={[styles.optionText, { color: colors.text }]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.checkButton,
          { backgroundColor: colors.primary },
          !selectedOption && { backgroundColor: colors.locked },
        ]}
        onPress={handleCheck}
        disabled={hasAnswered || !selectedOption}
      >
        <Text style={styles.checkButtonText}>{t.lesson.check}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 30,
  },
  option: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
  },
  optionText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
  },
  selected: {},
  correct: {},
  incorrect: {},
  disabled: {
    opacity: 0.5,
  },
  checkButton: {
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: "auto",
  },
  checkButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
