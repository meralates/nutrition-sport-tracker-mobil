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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/color";
import { useMeals } from "@/context/MealContext";

type Props = {
  visible: boolean;
  onClose: () => void;
  defaultDateISO: string; // Home’dan geliyor
};

export default function AddMealModal({ visible, onClose, defaultDateISO }: Props) {
  const { addMeal } = useMeals();

  const [title, setTitle] = useState("");
  const [kcal, setKcal] = useState("");
  const [notes, setNotes] = useState("");

  const canSave = useMemo(() => {
    const k = Number(kcal);
    return title.trim().length > 0 && Number.isFinite(k) && k > 0;
  }, [title, kcal]);

  const reset = () => {
    setTitle("");
    setKcal("");
    setNotes("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSave = () => {
    if (!canSave) return;

    addMeal({
      title: title.trim(),
      caloriesKcal: Number(kcal),
      notes: notes.trim() ? notes.trim() : undefined,
      date: defaultDateISO,
    });

    handleClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent
      presentationStyle="overFullScreen"
    >
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Overlay */}
        <Pressable style={styles.overlay} onPress={handleClose} />

        {/* Bottom sheet */}
        <View style={styles.sheetWrap} pointerEvents="box-none">
          <View style={styles.sheet}>
            <View style={styles.headerRow}>
              <View style={styles.headerLeft}>
                <View style={styles.iconBubble}>
                  <Ionicons name="restaurant" size={16} color={colors.purple2} />
                </View>

                <View>
                  <Text style={styles.title}>Meal Ekle</Text>
                  <Text style={styles.subtitle}>Bugüne yemek kaydı gir</Text>
                </View>
              </View>

              <Pressable onPress={handleClose} style={styles.closeBtn} hitSlop={8}>
                <Ionicons name="close" size={18} color={colors.text} />
              </Pressable>
            </View>

            <View style={{ height: 14 }} />

            <Text style={styles.label}>Başlık</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Örn: Tavuk + Pilav"
              placeholderTextColor="rgba(255,255,255,0.35)"
              style={styles.input}
              returnKeyType="next"
              autoCorrect={false}
            />

            <View style={{ height: 10 }} />

            <Text style={styles.label}>Kalori (kcal)</Text>
            <TextInput
              value={kcal}
              onChangeText={setKcal}
              placeholder="Örn: 650"
              placeholderTextColor="rgba(255,255,255,0.35)"
              keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
              style={styles.input}
              returnKeyType="done"
            />

            <View style={{ height: 10 }} />

            <Text style={styles.label}>Not (opsiyonel)</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Örn: Akşam yemeği"
              placeholderTextColor="rgba(255,255,255,0.35)"
              style={[styles.input, styles.textarea]}
              multiline
            />

            <View style={{ height: 14 }} />

            <View style={styles.actionsRow}>
              <Pressable style={styles.outlineBtn} onPress={handleClose}>
                <Text style={styles.outlineBtnText}>Vazgeç</Text>
              </Pressable>

              <Pressable
                style={[styles.primaryBtn, !canSave && styles.disabled]}
                onPress={handleSave}
                disabled={!canSave}
              >
                <Ionicons name="checkmark" size={16} color="#0B0B10" />
                <Text style={styles.primaryBtnText}>Kaydet</Text>
              </Pressable>
            </View>

            <Text style={styles.hint}>Başlık + kcal zorunlu (kcal &gt; 0).</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.58)",
  },

  sheetWrap: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  sheet: {
    width: "100%",
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 22,
    padding: 16,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },

  iconBubble: {
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

  label: { color: colors.muted, fontSize: 12, fontWeight: "800", marginBottom: 6 },

  input: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: colors.text,
    fontWeight: "800",
  },

  textarea: {
    minHeight: 86,
    textAlignVertical: "top",
  },

  actionsRow: { flexDirection: "row", gap: 10, marginTop: 4 },

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
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  primaryBtnText: { color: "#0B0B10", fontWeight: "900" },

  disabled: { opacity: 0.5 },

  hint: {
    marginTop: 10,
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700",
  },
});
