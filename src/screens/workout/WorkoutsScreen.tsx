import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/theme/color";

export default function WorkoutsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workouts</Text>
      <Text style={styles.text}>Antrenman ekleme / takip burada.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 20, gap: 10 },
  title: { color: colors.text, fontSize: 28, fontWeight: "700" },
  text: { color: colors.muted, fontSize: 16 },
});
