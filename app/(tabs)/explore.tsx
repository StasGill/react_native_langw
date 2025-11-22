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
import { polishUnits } from "../../data/polishLessons";
import { polishUnitsUA } from "../../data/polishLessonsUA";
import { useTranslation } from "../../hooks/useTranslation";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUnits } from "../../store/slices/lessonsSlice";
import { resetProgress } from "../../store/slices/progressSlice";
import { setSourceLanguage } from "../../store/slices/userSlice";

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { colors, theme, toggleTheme } = useTheme();
  const t = useTranslation();
  const { xp, level, streak, completedLessons } = useAppSelector(
    (state) => state.progress
  );
  const { name, sourceLanguage } = useAppSelector((state) => state.user);

  const totalLessons = 8;
  const completionRate = Math.round(
    (completedLessons.length / totalLessons) * 100
  );

  const handleReset = () => {
    if (confirm(t.profile.confirmReset)) {
      dispatch(resetProgress());
    }
  };

  const toggleLanguage = () => {
    const newLang = sourceLanguage === "en" ? "ua" : "en";
    dispatch(setSourceLanguage(newLang));
    if (newLang === "ua") {
      dispatch(setUnits(polishUnitsUA));
    } else {
      dispatch(setUnits(polishUnits));
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
          <Text style={styles.avatar}>👨‍💻</Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.level}>
            {t.profile.level} {level}
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>{xp}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              {t.profile.totalXp}
            </Text>
            <Text style={styles.statIcon}>⚡</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {streak}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              {t.profile.dayStreak}
            </Text>
            <Text style={styles.statIcon}>🔥</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {completedLessons.length}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              {t.profile.lessonsDone}
            </Text>
            <Text style={styles.statIcon}>✅</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {completionRate}%
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              {t.profile.completion}
            </Text>
            <Text style={styles.statIcon}>📊</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t.profile.settings}
          </Text>

          <View
            style={[
              styles.settingCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                {t.profile.darkMode}
              </Text>
              <Switch
                value={theme === "dark"}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFF"
              />
            </View>

            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />

            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                {t.profile.sourceLanguage}
              </Text>
              <Switch
                value={sourceLanguage === "ua"}
                onValueChange={toggleLanguage}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFF"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t.profile.achievements}
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
                  {t.profile.achievementsList.firstLesson.title}
                </Text>
                <Text
                  style={[
                    styles.achievementDesc,
                    { color: colors.textSecondary },
                  ]}
                >
                  {completedLessons.length > 0
                    ? t.profile.achievementsList.firstLesson.completed
                    : t.profile.achievementsList.firstLesson.desc}
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
                  {t.profile.achievementsList.weekWarrior.title}
                </Text>
                <Text
                  style={[
                    styles.achievementDesc,
                    { color: colors.textSecondary },
                  ]}
                >
                  {streak >= 7
                    ? t.profile.achievementsList.weekWarrior.completed
                    : t.profile.achievementsList.weekWarrior.desc.replace(
                        "7",
                        `${streak}/7`
                      )}
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
                  {t.profile.achievementsList.polishMaster.title}
                </Text>
                <Text
                  style={[
                    styles.achievementDesc,
                    { color: colors.textSecondary },
                  ]}
                >
                  {completedLessons.length === totalLessons
                    ? t.profile.achievementsList.polishMaster.completed
                    : t.profile.achievementsList.polishMaster.desc.replace(
                        "all lessons",
                        `(${completedLessons.length}/${totalLessons})`
                      )}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.resetButton, { backgroundColor: colors.error }]}
          onPress={handleReset}
        >
          <Text style={styles.resetButtonText}>{t.profile.resetProgress}</Text>
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
  divider: {
    height: 1,
    marginVertical: 12,
  },
});
