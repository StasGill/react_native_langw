import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { playCorrectSound, playIncorrectSound } from "../utils/sounds";

interface Pair {
  polish: string;
  english: string;
}

interface ExerciseMatchingProps {
  question: string;
  pairs: Pair[];
  onAnswer: (isCorrect: boolean) => void;
}

export default function ExerciseMatching({
  question,
  pairs,
  onAnswer,
}: ExerciseMatchingProps) {
  const [selectedPolish, setSelectedPolish] = useState<string | null>(null);
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [incorrectPair, setIncorrectPair] = useState<{
    polish: string;
    english: string;
  } | null>(null);

  const [shuffledPolish, setShuffledPolish] = useState<string[]>([]);
  const [shuffledEnglish, setShuffledEnglish] = useState<string[]>([]);
  const { colors } = useTheme();

  useEffect(() => {
    // Shuffle arrays independently
    const polishWords = pairs.map((p) => p.polish);
    const englishWords = pairs.map((p) => p.english);

    setShuffledPolish(shuffleArray(polishWords));
    setShuffledEnglish(shuffleArray(englishWords));
  }, [pairs]);

  const shuffleArray = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handlePolishPress = (word: string) => {
    if (matchedPairs.has(word)) return;
    setSelectedPolish(word);
    setIncorrectPair(null);

    if (selectedEnglish) {
      checkMatch(word, selectedEnglish);
    }
  };

  const handleEnglishPress = (word: string) => {
    if (matchedPairs.has(word)) return;
    setSelectedEnglish(word);
    setIncorrectPair(null);

    if (selectedPolish) {
      checkMatch(selectedPolish, word);
    }
  };

  const checkMatch = (polish: string, english: string) => {
    const isMatch = pairs.some(
      (pair) => pair.polish === polish && pair.english === english
    );

    if (isMatch) {
      playCorrectSound();
      const newMatched = new Set(matchedPairs);
      newMatched.add(polish);
      newMatched.add(english);
      setMatchedPairs(newMatched);
      setSelectedPolish(null);
      setSelectedEnglish(null);

      // Check if all pairs are matched
      if (newMatched.size === pairs.length * 2) {
        setTimeout(() => {
          onAnswer(true);
        }, 500);
      }
    } else {
      playIncorrectSound();
      setIncorrectPair({ polish, english });
      setTimeout(() => {
        setSelectedPolish(null);
        setSelectedEnglish(null);
        setIncorrectPair(null);
      }, 1000);
    }
  };

  const getWordStyle = (
    word: string,
    isSelected: boolean,
    isIncorrect: boolean
  ) => {
    const baseStyle = [
      styles.word,
      { backgroundColor: colors.surface, borderColor: colors.border },
    ];

    if (matchedPairs.has(word)) {
      return [
        ...baseStyle,
        styles.matched,
        { backgroundColor: "#D7FFD7", borderColor: colors.success },
      ];
    }
    if (isSelected) {
      return [
        ...baseStyle,
        styles.selected,
        { backgroundColor: colors.secondary, borderColor: colors.secondary },
      ];
    }
    if (isIncorrect) {
      return [
        ...baseStyle,
        styles.incorrect,
        { backgroundColor: "#FFD7D7", borderColor: colors.error },
      ];
    }
    return baseStyle;
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.question, { color: colors.text }]}>{question}</Text>

      <View style={styles.columnsContainer}>
        <View style={styles.column}>
          <Text style={[styles.columnTitle, { color: colors.textSecondary }]}>
            Polish
          </Text>
          {shuffledPolish.map((word, index) => (
            <TouchableOpacity
              key={index}
              style={getWordStyle(
                word,
                selectedPolish === word,
                incorrectPair?.polish === word
              )}
              onPress={() => handlePolishPress(word)}
              disabled={matchedPairs.has(word)}
            >
              <Text style={[styles.wordText, { color: colors.text }]}>
                {word}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.column}>
          <Text style={[styles.columnTitle, { color: colors.textSecondary }]}>
            English
          </Text>
          {shuffledEnglish.map((word, index) => (
            <TouchableOpacity
              key={index}
              style={getWordStyle(
                word,
                selectedEnglish === word,
                incorrectPair?.english === word
              )}
              onPress={() => handleEnglishPress(word)}
              disabled={matchedPairs.has(word)}
            >
              <Text style={[styles.wordText, { color: colors.text }]}>
                {word}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
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
    marginBottom: 30,
    textAlign: "center",
  },
  columnsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  column: {
    flex: 1,
    gap: 12,
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  word: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
  },
  wordText: {
    fontSize: 16,
    fontWeight: "500",
  },
  selected: {},
  matched: {},
  incorrect: {},
});
