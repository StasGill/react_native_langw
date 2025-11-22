import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Colors } from "../constants/colors";

interface ProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  color?: string;
}

export default function ProgressBar({
  progress,
  height = 12,
  color = Colors.primary,
}: ProgressBarProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(`${Math.min(progress * 100, 100)}%`, {
        damping: 15,
        stiffness: 100,
      }),
    };
  });

  return (
    <View style={[styles.container, { height }]}>
      <Animated.View
        style={[styles.fill, { backgroundColor: color }, animatedStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.border,
    borderRadius: 100,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 100,
  },
});
