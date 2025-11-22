import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface LessonCardProps {
  lesson: {
    id: string;
    title: string;
    xpReward: number;
  };
  isLocked: boolean;
  isCompleted: boolean;
  onPress: () => void;
  index: number;
}

export default function LessonCard({
  lesson,
  isLocked,
  isCompleted,
  onPress,
  index,
}: LessonCardProps) {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    if (isLocked) return colors.locked;
    if (isCompleted) return colors.completed;
    return colors.unlocked;
  };

  return (
    <TouchableOpacity
      style={[styles.container, { marginLeft: index % 2 === 0 ? 0 : 60 }]}
      onPress={onPress}
      disabled={isLocked}
      activeOpacity={0.7}
    >
      <View style={[styles.circle, { backgroundColor: getBackgroundColor() }]}>
        {isLocked ? (
          <Text style={styles.lockIcon}>🔒</Text>
        ) : isCompleted ? (
          <Text style={styles.checkIcon}>🏆</Text>
        ) : (
          <Text style={styles.number}>{index + 1}</Text>
        )}
      </View>

      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {lesson.title}
        </Text>
        <Text style={[styles.xp, { color: colors.textSecondary }]}>
          +{lesson.xpReward} XP
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    alignItems: "center",
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  lockIcon: {
    fontSize: 28,
  },
  checkIcon: {
    fontSize: 32,
  },
  number: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
  },
  info: {
    marginTop: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    maxWidth: 100,
    textAlign: "center",
  },
  xp: {
    fontSize: 12,
    marginTop: 2,
  },
});
