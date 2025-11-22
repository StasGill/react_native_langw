import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import LessonCard from "../../components/LessonCard";
import XPDisplay from "../../components/XPDisplay";
import { useTheme } from "../../contexts/ThemeContext";
import { useAppSelector } from "../../store/hooks";

export default function LearnScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { units } = useAppSelector((state) => state.lessons);
  const { completedLessons, xp, level, streak } = useAppSelector(
    (state) => state.progress
  );

  const isLessonUnlocked = (lessonId: string, requiredLessonId?: string) => {
    if (!requiredLessonId) return true;
    return completedLessons.includes(requiredLessonId);
  };

  const isLessonCompleted = (lessonId: string) => {
    return completedLessons.includes(lessonId);
  };

  const handleLessonPress = (lessonId: string, isLocked: boolean) => {
    if (isLocked) return;
    router.push(`/lesson/${lessonId}`);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            🇵🇱 Learn Polish
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Master Polish one lesson at a time
          </Text>
        </View>

        <XPDisplay xp={xp} streak={streak} level={level} />

        {units.map((unit) => (
          <View key={unit.id} style={styles.unit}>
            <View style={[styles.unitHeader, { backgroundColor: unit.color }]}>
              <Text style={styles.unitTitle}>{unit.title}</Text>
              <Text style={styles.unitDescription}>{unit.description}</Text>
            </View>

            <View style={styles.lessonsContainer}>
              {unit.lessons.map((lesson, index) => {
                const isLocked = !isLessonUnlocked(
                  lesson.id,
                  lesson.requiredLessonId
                );
                const isCompleted = isLessonCompleted(lesson.id);

                return (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    isLocked={isLocked}
                    isCompleted={isCompleted}
                    onPress={() => handleLessonPress(lesson.id, isLocked)}
                    index={index}
                  />
                );
              })}
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Keep learning every day! 🚀
          </Text>
        </View>
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
    padding: 20,
    paddingTop: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  unit: {
    marginBottom: 30,
  },
  unitHeader: {
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  unitTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  unitDescription: {
    fontSize: 14,
    color: "#FFF",
    opacity: 0.9,
  },
  lessonsContainer: {
    paddingHorizontal: 40,
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
