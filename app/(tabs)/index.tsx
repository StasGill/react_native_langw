import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LessonCard from "../../components/LessonCard";
import XPDisplay from "../../components/XPDisplay";
import { useTheme } from "../../contexts/ThemeContext";
import { polishUnits } from "../../data/polishLessons";
import { polishUnitsUA } from "../../data/polishLessonsUA";
import { useTranslation } from "../../hooks/useTranslation";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUnits } from "../../store/slices/lessonsSlice";
import { setSourceLanguage } from "../../store/slices/userSlice";

export default function LearnScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const t = useTranslation();
  const { units } = useAppSelector((state) => state.lessons);
  const { completedLessons, xp, level, streak } = useAppSelector(
    (state) => state.progress
  );
  const { sourceLanguage } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (sourceLanguage === "ua") {
      dispatch(setUnits(polishUnitsUA));
    } else {
      dispatch(setUnits(polishUnits));
    }
  }, [sourceLanguage, dispatch]);

  const toggleLanguage = () => {
    const newLang = sourceLanguage === "en" ? "ua" : "en";
    dispatch(setSourceLanguage(newLang));
  };

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
          <View style={styles.headerTop}>
            <Text style={[styles.title, { color: colors.text }]}>
              🇵🇱 {t.learn.title}
            </Text>
            <TouchableOpacity
              onPress={toggleLanguage}
              style={styles.langButton}
            >
              <Text style={styles.langButtonText}>
                {sourceLanguage === "en" ? "🇺🇸" : "🇺🇦"}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t.learn.subtitle}
          </Text>
        </View>

        <XPDisplay xp={xp} streak={streak} level={level} />

        {units.map((unit) => (
          <View key={unit.id} style={styles.unit}>
            <View style={[styles.unitHeader, { backgroundColor: unit.color }]}>
              <View style={styles.unitHeaderContent}>
                <View style={styles.unitTextContainer}>
                  <Text style={styles.unitTitle}>{unit.title}</Text>
                  <Text style={styles.unitDescription}>{unit.description}</Text>
                </View>
                <Text style={styles.unitEmoji}>{unit.emoji}</Text>
              </View>
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
            {t.learn.footer}
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
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  langButton: {
    padding: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 20,
  },
  langButtonText: {
    fontSize: 24,
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
  unitHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  unitTextContainer: {
    flex: 1,
    marginRight: 16,
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
  unitEmoji: {
    fontSize: 40,
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
