import React, { useMemo, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/color";
import { useWorkouts } from "@/context/WorkoutContext";

type Props = {
  visible: boolean;
  onClose: () => void;
  defaultDateISO?: string; // opsiyonel (Home'dan today gönderebilirsin)
};

export default function AddWorkoutModal({ visible, onClose, defaultDateISO }: Props) {
  const { addWorkout } = useWorkouts();

  const todayISO = useMemo(() => new Date().toISOString(), []);
  const dateISO = defaultDateISO ?? todayISO;

  const [title, setTitle] = useState("");
  const [durationMin, setDurationMin] = useState("");
  const [burnedKcal, setBurnedKcal] = useState("");
  const [notes, setNotes] = useState("");

  const canSave =
    title.trim().length >= 2 &&
    Number(durationMin) > 0 &&
    Number(burnedKcal) > 0;

  const reset = () => {
    setTitle("");
    setDurationMin("");
    setBurnedKcal("");
    setNotes("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSave = () => {
    if (!canSave) return;

    addWorkout({
      title: title.trim(),
      date: dateISO,
      durationMin: Number(durationMin),
      burnedKcal: Number(burnedKcal),
      notes: notes.trim() ? notes.trim() : undefined,
    });

    handleClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={s.backdrop}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={s.sheetWrap}
        >
          <View style={s.sheet}>
            <View style={s.header}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <View style={s.iconBubble}>
                  <Ionicons name="barbell" size={18} color={colors.purple2} />
                </View>
                <View>
                  <Text style={s.title}>Workout Ekle</Text>
                  <Text style={s.subtitle}>Bugüne antrenman kaydı gir</Text>
                </View>
              </View>

              <Pressable style={s.closeBtn} onPress={handleClose}>
                <Ionicons name="close" size={18} color={colors.text} />
              </Pressable>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 14 }} showsVerticalScrollIndicator={false}>
              <Text style={s.label}>Başlık</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Örn: Upper Body 💪"
                placeholderTextColor={colors.muted}
                style={s.input}
              />

              <View style={{ height: 12 }} />

              <View style={s.row}>
                <View style={{ flex: 1 }}>
                  <Text style={s.label}>Süre (dk)</Text>
                  <TextInput
                    value={durationMin}
                    onChangeText={setDurationMin}
                    placeholder="45"
                    placeholderTextColor={colors.muted}
                    keyboardType="numeric"
                    style={s.input}
                  />
                </View>

                <View style={{ width: 12 }} />

                <View style={{ flex: 1 }}>
                  <Text style={s.label}>Kalori (kcal)</Text>
                  <TextInput
                    value={burnedKcal}
                    onChangeText={setBurnedKcal}
                    placeholder="320"
                    placeholderTextColor={colors.muted}
                    keyboardType="numeric"
                    style={s.input}
                  />
                </View>
              </View>

              <View style={{ height: 12 }} />

              <Text style={s.label}>Not (opsiyonel)</Text>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Bench + Rows + Shoulder Press"
                placeholderTextColor={colors.muted}
                style={[s.input, { height: 92, textAlignVertical: "top" }]}
                multiline
              />
            </ScrollView>

            <View style={s.footer}>
              <Pressable style={s.outlineBtn} onPress={handleClose}>
                <Text style={s.outlineBtnText}>Vazgeç</Text>
              </Pressable>

              <Pressable
                style={[s.primaryBtn, !canSave && { opacity: 0.45 }]}
                onPress={handleSave}
                disabled={!canSave}
              >
                <Text style={s.primaryBtnText}>Kaydet</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
  },
  sheetWrap: { width: "100%" },
  sheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  iconBubble: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: colors.border,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: { color: colors.text, fontSize: 18, fontWeight: "900" },
  subtitle: { color: colors.muted, fontSize: 12, fontWeight: "700", marginTop: 2 },

  label: { color: colors.muted, fontSize: 12, fontWeight: "800", marginBottom: 6 },
  input: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: colors.text,
    fontWeight: "800",
  },
  row: { flexDirection: "row" },

  footer: { flexDirection: "row", gap: 10 },
  outlineBtn: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  outlineBtnText: { color: colors.text, fontWeight: "900" },
  primaryBtn: {
    flex: 1,
    backgroundColor: colors.purple2,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryBtnText: { color: "#0B0B10", fontWeight: "900" },
});
