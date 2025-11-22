import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "../hooks/useTranslation";
import { playCorrectSound, playIncorrectSound } from "../utils/sounds";

interface ExerciseTranslationProps {
  question: string;
  words: string[];
  correctAnswer: string;
  onAnswer: (isCorrect: boolean) => void;
}

export default function ExerciseTranslation({
  question,
  words,
  correctAnswer,
  onAnswer,
}: ExerciseTranslationProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(words);
  const [hasAnswered, setHasAnswered] = useState(false);
  const t = useTranslation();
  const { colors } = useTheme();

  const handleWordPress = (word: string, fromSelected: boolean) => {
    if (hasAnswered) return;

    if (fromSelected) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
      setAvailableWords([...availableWords, word]);
    } else {
      setSelectedWords([...selectedWords, word]);
      setAvailableWords(availableWords.filter((w) => w !== word));
    }
  };

  const handleCheck = () => {
    if (hasAnswered || selectedWords.length === 0) return;

    const answer = selectedWords.join(" ");
    const isCorrect = answer === correctAnswer;
    setHasAnswered(true);

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

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.question, { color: colors.text }]}>
          {question}
        </Text>

        <View
          style={[
            styles.answerBox,
            { backgroundColor: colors.surface, borderColor: colors.border },
            hasAnswered &&
              (selectedWords.join(" ") === correctAnswer
                ? {
                    backgroundColor: "#D7FFD7",
                    borderColor: colors.success,
                  }
                : {
                    backgroundColor: "#FFD7D7",
                    borderColor: colors.error,
                  }),
          ]}
        >
          {selectedWords.length === 0 ? (
            <Text style={[styles.placeholder, { color: colors.textSecondary }]}>
              Tap words to build your answer
            </Text>
          ) : (
            <View style={styles.selectedWords}>
              {selectedWords.map((word, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.selectedWord,
                    { backgroundColor: colors.primary },
                  ]}
                  onPress={() => handleWordPress(word, true)}
                  disabled={hasAnswered}
                >
                  <Text style={styles.selectedWordText}>{word}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.wordBank}>
          {availableWords.map((word, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.word,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={() => handleWordPress(word, false)}
              disabled={hasAnswered}
            >
              <Text style={[styles.wordText, { color: colors.text }]}>
                {word}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.checkButton,
          { backgroundColor: colors.primary },
          selectedWords.length === 0 && { backgroundColor: colors.locked },
        ]}
        onPress={handleCheck}
        disabled={hasAnswered || selectedWords.length === 0}
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
  content: {
    flex: 1,
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  answerBox: {
    minHeight: 80,
    borderRadius: 16,
    borderWidth: 2,
    padding: 16,
    marginBottom: 20,
    justifyContent: "center",
  },
  placeholder: {
    textAlign: "center",
    fontSize: 16,
  },
  selectedWords: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  selectedWord: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  selectedWordText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  wordBank: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  word: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
  },
  wordText: {
    fontSize: 16,
    fontWeight: "500",
  },
  checkButton: {
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  checkButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
