import React from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { colors } from "@/theme/color";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { AppTabParamList } from "@/navigation/AppTabs";

type MealsRouteProp = RouteProp<AppTabParamList, "Meals">;

export default function MealsScreen({ navigation }: any) {
  const route = useRoute<MealsRouteProp>();
  const [open, setOpen] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.openAdd) {
        setOpen(true);
        // paramı temizlemezsek her gelişte tekrar açar
        navigation.setParams({ openAdd: false });
      }
    }, [route.params?.openAdd, navigation])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meals</Text>
      <Text style={styles.text}>Meal ekranı burada olacak.</Text>

      <Modal transparent visible={open} animationType="slide" onRequestClose={() => setOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Meal Ekle</Text>
            <Text style={styles.modalText}>Buraya USDA search + porsiyon gelecek.</Text>

            <Pressable style={styles.closeBtn} onPress={() => setOpen(false)}>
              <Text style={styles.closeText}>Kapat</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 20, gap: 10 },
  title: { color: colors.text, fontSize: 28, fontWeight: "700" },
  text: { color: colors.muted, fontSize: 16 },

  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalCard: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  modalTitle: { color: colors.text, fontSize: 18, fontWeight: "800" },
  modalText: { color: colors.muted },

  closeBtn: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: colors.purple2,
  },
  closeText: { color: "#0b0b0f", fontWeight: "800" },
});
