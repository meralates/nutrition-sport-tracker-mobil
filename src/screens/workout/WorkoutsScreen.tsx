import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/color";
import AddWorkoutModal from "@/components/AddWorkoutModal";
import { useWorkouts } from "@/context/WorkoutContext";

function formatDateLabel(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const sameDay = d.toISOString().slice(0, 10) === now.toISOString().slice(0, 10);
  if (sameDay) return "Bugün";

  // 18 Oca gibi
  return d.toLocaleDateString("tr-TR", { day: "2-digit", month: "short" });
}

function WorkoutCard({
  title,
  dateLabel,
  durationMin,
  burnedKcal,
  notes,
}: {
  title: string;
  dateLabel: string;
  durationMin: number;
  burnedKcal: number;
  notes?: string;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.cardLeft}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSub}>{dateLabel}</Text>
        </View>

        <View style={styles.pill}>
          <Ionicons name="time" size={14} color={colors.muted} />
          <Text style={styles.pillText}>{durationMin} dk</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Yakılan</Text>
          <Text style={styles.statValue}>
            <Text style={styles.statValueAccent}>{burnedKcal}</Text> kcal
          </Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statLabel}>Not</Text>
          <Text style={styles.statValueMuted} numberOfLines={1}>
            {notes ?? "-"}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function WorkoutsScreen() {
  const [open, setOpen] = useState(false);
  const { workouts, addWorkout } = useWorkouts();

  const data = useMemo(
    () =>
      workouts.map((w) => ({
        ...w,
        dateLabel: formatDateLabel(w.date),
      })),
    [workouts]
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Workouts</Text>
          <Text style={styles.subtitle}>Antrenman kayıtların</Text>
        </View>

        <Pressable style={styles.addBtn} onPress={() => setOpen(true)}>
          <Ionicons name="add" size={18} color="#0B0B10" />
          <Text style={styles.addBtnText}>Workout</Text>
        </Pressable>
      </View>

      <FlatList
        data={data}
        keyExtractor={(x) => x.id}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 24, gap: 12 }}
        renderItem={({ item }) => (
          <WorkoutCard
            title={item.title}
            dateLabel={item.dateLabel}
            durationMin={item.durationMin}
            burnedKcal={item.burnedKcal}
            notes={item.notes}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Henüz workout yok</Text>
            <Text style={styles.emptySub}>Sağ üstten “Workout” ekleyebilirsin.</Text>
          </View>
        }
      />

      <AddWorkoutModal
        visible={open}
        onClose={() => setOpen(false)}
        onSave={addWorkout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 20 },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  title: { color: colors.text, fontSize: 28, fontWeight: "800" },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 2 },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.purple2,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  addBtnText: { color: "#0B0B10", fontWeight: "900" },

  empty: {
    marginTop: 18,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(255,255,255,0.03)",
    gap: 6,
  },
  emptyTitle: { color: colors.text, fontSize: 14, fontWeight: "900" },
  emptySub: { color: colors.muted, fontSize: 12, fontWeight: "700" },

  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 10,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  cardLeft: { flex: 1, gap: 4 },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: "900" },
  cardSub: { color: colors.muted, fontSize: 13, fontWeight: "700" },

  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: colors.border,
  },
  pillText: { color: colors.text, fontSize: 12, fontWeight: "800" },

  divider: { height: 1, backgroundColor: colors.border, opacity: 0.9 },

  statsRow: { flexDirection: "row", gap: 14 },
  stat: { flex: 1, gap: 6 },
  statLabel: { color: colors.muted, fontSize: 12, fontWeight: "800" },
  statValue: { color: colors.text, fontSize: 14, fontWeight: "900" },
  statValueAccent: { color: colors.purple2, fontWeight: "900" },
  statValueMuted: { color: colors.text, fontSize: 13, fontWeight: "800", opacity: 0.9 },
});
