import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "@/theme/color";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.text}>Şimdilik placeholder.</Text>

      <Pressable style={styles.btn}>
        <Text style={styles.btnText}>Sign In</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 20, gap: 14, justifyContent: "center" },
  title: { color: colors.text, fontSize: 30, fontWeight: "800" },
  text: { color: colors.muted, fontSize: 16 },
  btn: { backgroundColor: colors.purple, paddingVertical: 14, borderRadius: 14, alignItems: "center", marginTop: 10 },
  btnText: { color: colors.text, fontSize: 16, fontWeight: "700" },
});
