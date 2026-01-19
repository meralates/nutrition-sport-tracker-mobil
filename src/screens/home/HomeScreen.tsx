import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/color";
import { useWorkouts } from "@/context/WorkoutContext";
import AddWorkoutModal from "@/components/AddWorkoutModal";
import AddMealModal from "@/components/AddMealModal";

const DAILY_TARGET = 2200;

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.max(0, Math.min(1, max === 0 ? 0 : value / max));
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${pct * 100}%` }]} />
    </View>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function HomeScreen() {
  const { workouts, totalCaloriesToday, totalDurationToday } = useWorkouts();

  const [workoutModalOpen, setWorkoutModalOpen] = useState(false);
  const [mealModalOpen, setMealModalOpen] = useState(false);

  const todayKey = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const todayISO = useMemo(() => new Date().toISOString(), []);

  const todayLatestWorkout = useMemo(() => {
    const todays = workouts.filter((w) => w.date.startsWith(todayKey));
    return todays[0]; // addWorkout başa ekliyor
  }, [workouts, todayKey]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Bugünkü özetin</Text>

      <View style={{ height: 12 }} />

      <Card title="Günlük Kalori">
        <Text style={styles.kcalText}>
          <Text style={styles.kcalAccent}>{totalCaloriesToday}</Text> /{" "}
          {DAILY_TARGET} kcal
        </Text>
        <ProgressBar value={totalCaloriesToday} max={DAILY_TARGET} />
        <Text style={styles.mutedSmall}>
          Bugün toplam {totalDurationToday} dk antrenman
        </Text>
      </Card>

      <View style={{ height: 12 }} />

      <Card title="Bugünkü Workout">
        {todayLatestWorkout ? (
          <View style={styles.workoutRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.workoutTitle}>
                {todayLatestWorkout.title}
              </Text>
              <Text style={styles.workoutMeta}>
                {todayLatestWorkout.durationMin} dk •{" "}
                {todayLatestWorkout.burnedKcal} kcal
              </Text>
            </View>

            <View style={styles.pill}>
              <Ionicons name="flame" size={14} color={colors.purple2} />
              <Text style={styles.pillText}>
                {todayLatestWorkout.burnedKcal}
              </Text>
            </View>
          </View>
        ) : (
          <Text style={styles.mutedSmall}>Bugün workout yok. Ekleyebilirsin.</Text>
        )}
      </Card>

      <View style={{ height: 14 }} />

      <View style={styles.actionsRow}>
        <Pressable style={styles.primaryBtn} onPress={() => setMealModalOpen(true)}>
          <Text style={styles.primaryBtnText}>+ Meal Ekle</Text>
        </Pressable>

        <Pressable
          style={styles.outlineBtn}
          onPress={() => setWorkoutModalOpen(true)}
        >
          <Text style={styles.outlineBtnText}>+ Workout Ekle</Text>
        </Pressable>
      </View>

      {/* WORKOUT MODAL */}
      <AddWorkoutModal
        visible={workoutModalOpen}
        onClose={() => setWorkoutModalOpen(false)}
        defaultDateISO={todayISO}
      />

      {/* MEAL MODAL */}
      <AddMealModal
        visible={mealModalOpen}
        onClose={() => setMealModalOpen(false)}
        onSave={(meal) => {
          // Sprint 1: sadece modal aç/kapat + UI akışı
          // Sprint 2: MealContext ekleyip burada addMeal(meal) yapacağız
          console.log("MEAL_SAVED", meal);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 20 },
  title: { color: colors.text, fontSize: 28, fontWeight: "900" },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 4 },

  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    gap: 10,
  },
  cardTitle: { color: colors.muted, fontSize: 13, fontWeight: "800" },

  kcalText: { color: colors.text, fontSize: 18, fontWeight: "900" },
  kcalAccent: { color: colors.purple2 },

  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: colors.purple2 },

  mutedSmall: { color: colors.muted, fontSize: 12, fontWeight: "700" },

  workoutRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  workoutTitle: { color: colors.text, fontSize: 16, fontWeight: "900" },
  workoutMeta: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },

  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: colors.border,
  },
  pillText: { color: colors.text, fontSize: 12, fontWeight: "900" },

  actionsRow: { flexDirection: "row", gap: 10 },

  primaryBtn: {
    flex: 1,
    backgroundColor: colors.purple2,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryBtnText: { color: "#0B0B10", fontWeight: "900" },

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
});
