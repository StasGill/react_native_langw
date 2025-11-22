import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetProgress } from "../../store/slices/progressSlice";

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { colors, theme, toggleTheme } = useTheme();
  const { xp, level, streak, completedLessons } = useAppSelector(
    (state) => state.progress
  );
  const { name } = useAppSelector((state) => state.user);

  const totalLessons = 8;
  const completionRate = Math.round(
    (completedLessons.length / totalLessons) * 100
  );

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all progress?")) {
      dispatch(resetProgress());
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatar}>👤</Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.level}>Level {level}</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>{xp}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Total XP
            </Text>
            <Text style={styles.statIcon}>⚡</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {streak}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Day Streak
            </Text>
            <Text style={styles.statIcon}>🔥</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {completedLessons.length}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Lessons Done
            </Text>
            <Text style={styles.statIcon}>✅</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {completionRate}%
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Completion
            </Text>
            <Text style={styles.statIcon}>📊</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Settings
          </Text>

          <View
            style={[
              styles.settingCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Dark Mode
              </Text>
              <Switch
                value={theme === "dark"}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFF"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Achievements
          </Text>

          <View style={styles.achievementsGrid}>
            <View
              style={[
                styles.achievementCard,
                { backgroundColor: colors.surface },
              ]}
            >
              <Text style={styles.achievementIcon}>🎯</Text>
              <View style={styles.achievementInfo}>
                <Text style={[styles.achievementTitle, { color: colors.text }]}>
                  First Lesson
                </Text>
                <Text
                  style={[
                    styles.achievementDesc,
                    { color: colors.textSecondary },
                  ]}
                >
                  {completedLessons.length > 0
                    ? "Completed! ✓"
                    : "Complete your first lesson"}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.achievementCard,
                { backgroundColor: colors.surface },
              ]}
            >
              <Text style={styles.achievementIcon}>🔥</Text>
              <View style={styles.achievementInfo}>
                <Text style={[styles.achievementTitle, { color: colors.text }]}>
                  Week Warrior
                </Text>
                <Text
                  style={[
                    styles.achievementDesc,
                    { color: colors.textSecondary },
                  ]}
                >
                  {streak >= 7
                    ? "Completed! ✓"
                    : `Reach a 7-day streak (${streak}/7)`}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.achievementCard,
                { backgroundColor: colors.surface },
              ]}
            >
              <Text style={styles.achievementIcon}>🏆</Text>
              <View style={styles.achievementInfo}>
                <Text style={[styles.achievementTitle, { color: colors.text }]}>
                  Polish Master
                </Text>
                <Text
                  style={[
                    styles.achievementDesc,
                    { color: colors.textSecondary },
                  ]}
                >
                  {completedLessons.length === totalLessons
                    ? "Completed! ✓"
                    : `Complete all lessons (${completedLessons.length}/${totalLessons})`}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.resetButton, { backgroundColor: colors.error }]}
          onPress={handleReset}
        >
          <Text style={styles.resetButtonText}>Reset Progress</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    margin: 15,
  },
  avatar: {
    fontSize: 60,
    marginBottom: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  level: {
    fontSize: 16,
    color: "#FFF",
    opacity: 0.9,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    gap: 12,
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    position: "relative",
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  statIcon: {
    fontSize: 24,
    position: "absolute",
    top: 12,
    right: 12,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  settingCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  achievementCard: {
    width: "48%",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  achievementIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  achievementInfo: {
    alignItems: "center",
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  achievementDesc: {
    fontSize: 14,
    textAlign: "center",
  },
  resetButton: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
