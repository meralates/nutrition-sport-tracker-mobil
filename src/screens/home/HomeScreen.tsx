import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/color";
import { useWorkouts } from "@/context/WorkoutContext";
import { useMeals } from "@/context/MealContext";
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

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

function StatMini({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.miniStat}>
      <Ionicons name={icon} size={14} color={colors.purple2} />
      <View style={{ gap: 2 }}>
        <Text style={styles.miniLabel}>{label}</Text>
        <Text style={styles.miniValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const { workouts, totalCaloriesToday, totalDurationToday } = useWorkouts();
  const { meals, totalMealCaloriesToday } = useMeals();

  const [workoutModalOpen, setWorkoutModalOpen] = useState(false);
  const [mealModalOpen, setMealModalOpen] = useState(false);

  const todayKey = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const todayISO = useMemo(() => new Date().toISOString(), []);

  const todayLatestWorkout = useMemo(() => {
    return workouts.find((w) => w.date.startsWith(todayKey));
  }, [workouts, todayKey]);

  const todayLatestMeal = useMemo(() => {
    return meals.find((m) => m.date.startsWith(todayKey));
  }, [meals, todayKey]);

  const eaten = totalMealCaloriesToday; // meal toplamı
  const burned = totalCaloriesToday; // workout yakılan
  const net = eaten - burned; // net kalori

  const netLabel = net >= 0 ? `+${net}` : `${net}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Bugünkü özetin</Text>

      <View style={{ height: 12 }} />

      {/* KALORİ */}
      <Card title="Günlük Kalori">
        <View style={styles.kcalTopRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.kcalText}>
              <Text style={styles.kcalAccent}>{eaten}</Text> / {DAILY_TARGET} kcal
            </Text>
            <Text style={styles.mutedSmall}>Net: <Text style={styles.netAccent}>{netLabel}</Text> kcal</Text>
          </View>

          <View style={styles.netPill}>
            <Ionicons name="swap-vertical" size={14} color={colors.purple2} />
            <Text style={styles.netPillText}>{netLabel}</Text>
          </View>
        </View>

        <ProgressBar value={eaten} max={DAILY_TARGET} />

        <View style={styles.miniRow}>
          <StatMini icon="restaurant" label="Eaten" value={`${eaten} kcal`} />
          <StatMini icon="flame" label="Burned" value={`${burned} kcal`} />
          <StatMini icon="time" label="Workout" value={`${totalDurationToday} dk`} />
        </View>
      </Card>

      <View style={{ height: 12 }} />

      {/* WORKOUT */}
      <Card title="Bugünkü Workout">
        {todayLatestWorkout ? (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{todayLatestWorkout.title}</Text>
              <Text style={styles.rowMeta}>
                {todayLatestWorkout.durationMin} dk • {todayLatestWorkout.burnedKcal} kcal
              </Text>
            </View>

            <View style={styles.pill}>
              <Ionicons name="barbell" size={14} color={colors.purple2} />
              <Text style={styles.pillText}>{todayLatestWorkout.burnedKcal}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.mutedSmall}>Bugün workout yok</Text>
        )}
      </Card>

      <View style={{ height: 12 }} />

      {/* MEAL */}
      <Card title="Bugünkü Son Meal">
        {todayLatestMeal ? (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{todayLatestMeal.title}</Text>
              <Text style={styles.rowMeta}>{todayLatestMeal.caloriesKcal} kcal</Text>
            </View>

            <View style={styles.pill}>
              <Ionicons name="restaurant" size={14} color={colors.purple2} />
              <Text style={styles.pillText}>{todayLatestMeal.caloriesKcal}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.mutedSmall}>Bugün meal yok</Text>
        )}
      </Card>

      <View style={{ height: 14 }} />

      {/* ACTIONS */}
      <View style={styles.actionsRow}>
        <Pressable style={styles.primaryBtn} onPress={() => setMealModalOpen(true)}>
          <Text style={styles.primaryBtnText}>+ Meal Ekle</Text>
        </Pressable>

        <Pressable style={styles.outlineBtn} onPress={() => setWorkoutModalOpen(true)}>
          <Text style={styles.outlineBtnText}>+ Workout Ekle</Text>
        </Pressable>
      </View>

      <AddWorkoutModal
        visible={workoutModalOpen}
        onClose={() => setWorkoutModalOpen(false)}
        defaultDateISO={todayISO}
      />

      <AddMealModal
        visible={mealModalOpen}
        onClose={() => setMealModalOpen(false)}
        defaultDateISO={todayISO}
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

  kcalTopRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  kcalText: { color: colors.text, fontSize: 18, fontWeight: "900" },
  kcalAccent: { color: colors.purple2 },
  netAccent: { color: colors.text, fontWeight: "900" },

  netPill: {
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
  netPillText: { color: colors.text, fontSize: 12, fontWeight: "900" },

  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: colors.purple2 },

  miniRow: { flexDirection: "row", gap: 10, marginTop: 4, flexWrap: "wrap" },
  miniStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: colors.border,
  },
  miniLabel: { color: colors.muted, fontSize: 11, fontWeight: "800" },
  miniValue: { color: colors.text, fontSize: 12, fontWeight: "900" },

  mutedSmall: { color: colors.muted, fontSize: 12, fontWeight: "700" },

  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  rowTitle: { color: colors.text, fontSize: 16, fontWeight: "900" },
  rowMeta: { color: colors.muted, fontSize: 12, fontWeight: "700" },

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
