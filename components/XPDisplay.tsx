import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface XPDisplayProps {
  xp: number;
  streak: number;
  level: number;
}

export default function XPDisplay({ xp, streak, level }: XPDisplayProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.item}>
        <Text style={styles.emoji}>⚡</Text>
        <View>
          <Text style={[styles.value, { color: colors.text }]}>{xp}</Text>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            XP
          </Text>
        </View>
      </View>

      <View style={styles.item}>
        <Text style={styles.emoji}>🔥</Text>
        <View>
          <Text style={[styles.value, { color: colors.text }]}>{streak}</Text>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            Day Streak
          </Text>
        </View>
      </View>

      <View style={styles.item}>
        <Text style={styles.emoji}>🏆</Text>
        <View>
          <Text style={[styles.value, { color: colors.text }]}>{level}</Text>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            Level
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  emoji: {
    fontSize: 28,
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    fontSize: 12,
  },
});
