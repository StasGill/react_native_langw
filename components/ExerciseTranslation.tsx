import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/colors";
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
      <Text style={styles.question}>{question}</Text>

      <View
        style={[
          styles.answerBox,
          hasAnswered &&
            (selectedWords.join(" ") === correctAnswer
              ? styles.correct
              : styles.incorrect),
        ]}
      >
        {selectedWords.length === 0 ? (
          <Text style={styles.placeholder}>Tap words to build your answer</Text>
        ) : (
          <View style={styles.selectedWords}>
            {selectedWords.map((word, index) => (
              <TouchableOpacity
                key={index}
                style={styles.selectedWord}
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
            style={styles.word}
            onPress={() => handleWordPress(word, false)}
            disabled={hasAnswered}
          >
            <Text style={styles.wordText}>{word}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.checkButton,
          selectedWords.length === 0 && styles.checkButtonDisabled,
        ]}
        onPress={handleCheck}
        disabled={hasAnswered || selectedWords.length === 0}
      >
        <Text style={styles.checkButtonText}>CHECK</Text>
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
    color: Colors.text,
    marginBottom: 30,
    textAlign: "center",
  },
  answerBox: {
    minHeight: 80,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    padding: 16,
    marginBottom: 20,
    justifyContent: "center",
  },
  placeholder: {
    color: Colors.textSecondary,
    textAlign: "center",
    fontSize: 16,
  },
  selectedWords: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  selectedWord: {
    backgroundColor: Colors.primary,
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
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  wordText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "500",
  },
  checkButton: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  checkButtonDisabled: {
    backgroundColor: Colors.locked,
  },
  checkButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  correct: {
    backgroundColor: "#D7FFD7",
    borderColor: Colors.success,
  },
  incorrect: {
    backgroundColor: "#FFD7D7",
    borderColor: Colors.error,
  },
});
