import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/colors";
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

  const handleSelect = (option: string) => {
    if (hasAnswered) return;

    setSelectedOption(option);
    setHasAnswered(true);
    const isCorrect = option === correctAnswer;

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
    if (!hasAnswered) return styles.option;

    if (option === correctAnswer) {
      return [styles.option, styles.correct];
    }
    if (option === selectedOption && option !== correctAnswer) {
      return [styles.option, styles.incorrect];
    }
    return [styles.option, styles.disabled];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getOptionStyle(option)}
            onPress={() => handleSelect(option)}
            disabled={hasAnswered}
            activeOpacity={0.7}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
    color: Colors.text,
    marginBottom: 30,
    textAlign: "center",
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  optionText: {
    fontSize: 18,
    color: Colors.text,
    textAlign: "center",
    fontWeight: "500",
  },
  correct: {
    backgroundColor: "#D7FFD7",
    borderColor: Colors.success,
  },
  incorrect: {
    backgroundColor: "#FFD7D7",
    borderColor: Colors.error,
  },
  disabled: {
    opacity: 0.5,
  },
});
