import React, { useMemo, useState } from "react";
import { Modal, View, Text, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/color";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (meal: { title: string; kcal: number; notes?: string }) => void;
};

export default function AddMealModal({ visible, onClose, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [kcal, setKcal] = useState("0");
  const [notes, setNotes] = useState("");

  const kcalNum = useMemo(() => Number(kcal || 0), [kcal]);
  const canSave = title.trim().length > 0 && kcalNum > 0;

  const handleSave = () => {
    if (!canSave) return;

    onSave({
      title: title.trim(),
      kcal: kcalNum,
      notes: notes.trim() ? notes.trim() : undefined,
    });

    // reset
    setTitle("");
    setKcal("0");
    setNotes("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.kb}>
          <View style={styles.sheet}>
            <View style={styles.topRow}>
              <View style={styles.topLeft}>
                <View style={styles.iconBubble}>
                  <Ionicons name="restaurant" size={18} color={colors.purple2} />
                </View>
                <View>
                  <Text style={styles.h1}>Meal Ekle</Text>
                  <Text style={styles.h2}>Bugüne yemek kaydı gir</Text>
                </View>
              </View>

              <Pressable style={styles.closeBtn} onPress={onClose}>
                <Ionicons name="close" size={18} color={colors.text} />
              </Pressable>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Başlık</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Örn: Tavuk + Pilav"
                placeholderTextColor="rgba(255,255,255,0.35)"
                style={styles.input}
              />
            </View>

            <View style={styles.row2}>
              <View style={[styles.field, { flex: 1 }]}>
                <Text style={styles.label}>Kalori (kcal)</Text>
                <TextInput
                  value={kcal}
                  onChangeText={setKcal}
                  keyboardType="number-pad"
                  placeholder="650"
                  placeholderTextColor="rgba(255,255,255,0.35)"
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Not (opsiyonel)</Text>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Örn: Akşam yemeği"
                placeholderTextColor="rgba(255,255,255,0.35)"
                style={[styles.input, { height: 90, textAlignVertical: "top", paddingTop: 12 }]}
                multiline
              />
            </View>

            <View style={styles.actions}>
              <Pressable style={styles.cancelBtn} onPress={onClose}>
                <Text style={styles.cancelText}>Vazgeç</Text>
              </Pressable>

              <Pressable
                style={[styles.saveBtn, !canSave && { opacity: 0.5 }]}
                onPress={handleSave}
                disabled={!canSave}
              >
                <Ionicons name="checkmark" size={18} color="#0B0B10" />
                <Text style={styles.saveText}>Kaydet</Text>
              </Pressable>
            </View>

            <Text style={styles.foot}>Başlık + kcal zorunlu (kcal &gt; 0).</Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  kb: { width: "100%", alignItems: "center", justifyContent: "center" },

  sheet: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },

  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  topLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconBubble: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: colors.border,
  },
  h1: { color: colors.text, fontSize: 18, fontWeight: "900" },
  h2: { color: colors.muted, fontSize: 12, fontWeight: "700", marginTop: 2 },

  closeBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: colors.border,
  },

  field: { gap: 8 },
  label: { color: colors.muted, fontSize: 12, fontWeight: "800" },
  input: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontWeight: "800",
  },

  row2: { flexDirection: "row", gap: 10 },

  actions: { flexDirection: "row", gap: 12, marginTop: 6 },
  cancelBtn: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  cancelText: { color: colors.text, fontWeight: "900" },

  saveBtn: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    backgroundColor: colors.purple2,
  },
  saveText: { color: "#0B0B10", fontWeight: "900" },

  foot: { color: colors.muted, fontSize: 11, fontWeight: "700", opacity: 0.9 },
});
