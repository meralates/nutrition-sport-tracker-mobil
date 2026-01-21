import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/color";
import { useMeals, type Meal } from "@/context/MealContext";
import AddMealModal from "@/components/AddMealModal";

function formatDateTR(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("tr-TR", { day: "2-digit", month: "short" });
}

function MealCard({ item }: { item: Meal }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.cardSub}>{formatDateTR(item.date)}</Text>
        </View>

        <View style={styles.pill}>
          <Ionicons name="flame" size={14} color={colors.purple2} />
          <Text style={styles.pillText}>{item.caloriesKcal} kcal</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.note} numberOfLines={2}>
        {item.notes?.trim() ? item.notes : "Not yok"}
      </Text>
    </View>
  );
}

type FilterMode = "today" | "all";

export default function MealsScreen() {
  const { meals, totalMealCaloriesToday } = useMeals();

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<FilterMode>("today");
  const [q, setQ] = useState("");

  const todayKey = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const todayISO = useMemo(() => new Date().toISOString(), []);

  const shownMeals = useMemo(() => {
    const query = q.trim().toLowerCase();

    let base = meals;
    if (filter === "today") base = base.filter((m) => m.date.startsWith(todayKey));

    if (query.length > 0) {
      base = base.filter((m) => (m.title ?? "").toLowerCase().includes(query));
    }

    return base;
  }, [meals, filter, q, todayKey]);

  const headerKcal = filter === "today" ? totalMealCaloriesToday : meals.reduce((s, m) => s + (Number(m.caloriesKcal) || 0), 0);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Meals</Text>
          <Text style={styles.subtitle}>
            {filter === "today" ? "Bugün" : "Tüm zamanlar"} toplam{" "}
            <Text style={styles.subtitleAccent}>{headerKcal}</Text> kcal
          </Text>
        </View>

        <Pressable style={styles.addBtn} onPress={() => setOpen(true)}>
          <Ionicons name="add" size={18} color="#0B0B10" />
          <Text style={styles.addBtnText}>Meal</Text>
        </Pressable>
      </View>

      {/* Filters */}
      <View style={{ height: 12 }} />

      <View style={styles.controlsRow}>
        <View style={styles.segment}>
          <Pressable
            onPress={() => setFilter("today")}
            style={[styles.segmentBtn, filter === "today" && styles.segmentBtnActive]}
          >
            <Text style={[styles.segmentText, filter === "today" && styles.segmentTextActive]}>Today</Text>
          </Pressable>

          <Pressable
            onPress={() => setFilter("all")}
            style={[styles.segmentBtn, filter === "all" && styles.segmentBtnActive]}
          >
            <Text style={[styles.segmentText, filter === "all" && styles.segmentTextActive]}>All</Text>
          </Pressable>
        </View>

        <View style={styles.searchWrap}>
          <Ionicons name="search" size={16} color={colors.muted} />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search meal..."
            placeholderTextColor="rgba(255,255,255,0.35)"
            style={styles.searchInput}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
          {!!q && (
            <Pressable onPress={() => setQ("")} hitSlop={10}>
              <Ionicons name="close-circle" size={16} color={colors.muted} />
            </Pressable>
          )}
        </View>
      </View>

      <FlatList
        data={shownMeals}
        keyExtractor={(x) => x.id}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 24, gap: 12 }}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Meal bulunamadı</Text>
            <Text style={styles.emptySub}>
              {filter === "today"
                ? "Bugün için kayıt yok veya arama sonucu boş."
                : "Henüz meal yok veya arama sonucu boş."}
            </Text>
          </View>
        }
        renderItem={({ item }) => <MealCard item={item} />}
      />

      <AddMealModal visible={open} onClose={() => setOpen(false)} defaultDateISO={todayISO} />
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
  title: { color: colors.text, fontSize: 28, fontWeight: "900" },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 4, fontWeight: "700" },
  subtitleAccent: { color: colors.purple2, fontWeight: "900" },

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

  controlsRow: { gap: 10 },

  segment: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  segmentBtn: { flex: 1, paddingVertical: 10, alignItems: "center" },
  segmentBtnActive: { backgroundColor: "rgba(255,255,255,0.05)" },
  segmentText: { color: colors.muted, fontWeight: "900", fontSize: 12 },
  segmentTextActive: { color: colors.text },

  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  searchInput: { flex: 1, color: colors.text, fontWeight: "800" },

  emptyCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 6,
    marginTop: 12,
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
  cardTop: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: "900" },
  cardSub: { color: colors.muted, fontSize: 12, fontWeight: "700", marginTop: 4 },

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

  divider: { height: 1, backgroundColor: colors.border, opacity: 0.9 },
  note: { color: colors.text, fontSize: 13, fontWeight: "700", opacity: 0.9 },
});
