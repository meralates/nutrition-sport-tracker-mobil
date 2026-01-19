import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { colors } from "@/theme/color";
import { useNavigation } from "@react-navigation/native";

export default function AddWorkoutScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [minutes, setMinutes] = useState("");
  const [kcal, setKcal] = useState("");

  const onSave = () => {
    if (!title.trim()) {
      Alert.alert("Hata", "Workout adı boş olamaz.");
      return;
    }

    // Şimdilik mock kayıt: sadece geri dön
    // (Sprint 2'nin devamında bunu global state'e bağlayacağız)
    Alert.alert("Kaydedildi", "Workout eklendi (mock).", [
      { text: "Tamam", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Workout Ekle</Text>
      <Text style={styles.sub}>Bugünkü antrenmanını kaydet.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Workout adı</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Örn: Upper Body"
          placeholderTextColor={colors.muted}
          style={styles.input}
        />

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Süre (dk)</Text>
            <TextInput
              value={minutes}
              onChangeText={setMinutes}
              placeholder="45"
              placeholderTextColor={colors.muted}
              keyboardType="number-pad"
              style={styles.input}
            />
          </View>

          <View style={styles.col}>
            <Text style={styles.label}>Kalori (kcal)</Text>
            <TextInput
              value={kcal}
              onChangeText={setKcal}
              placeholder="320"
              placeholderTextColor={colors.muted}
              keyboardType="number-pad"
              style={styles.input}
            />
          </View>
        </View>

        <Pressable style={styles.primaryBtn} onPress={onSave}>
          <Text style={styles.primaryBtnText}>Kaydet</Text>
        </Pressable>

        <Pressable style={styles.ghostBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.ghostBtnText}>Vazgeç</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 20, gap: 10 },
  h1: { color: colors.text, fontSize: 28, fontWeight: "800" },
  sub: { color: colors.muted, fontSize: 14 },

  card: {
    marginTop: 10,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },

  label: { color: colors.muted, fontSize: 12 },
  input: {
    backgroundColor: colors.bg,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 16,
  },

  row: { flexDirection: "row", gap: 10 },
  col: { flex: 1 },

  primaryBtn: {
    marginTop: 6,
    backgroundColor: colors.purple2,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryBtnText: { color: "#0B0B10", fontWeight: "800", fontSize: 16 },

  ghostBtn: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    borderColor: colors.border,
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  ghostBtnText: { color: colors.text, fontWeight: "700", fontSize: 14 },
});
