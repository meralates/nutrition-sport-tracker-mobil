// src/context/MealContext.tsx
import React, { createContext, useContext, useMemo, useState } from "react";
import { nanoid } from "nanoid/non-secure";

export type Meal = {
  id: string;
  title: string;
  date: string; // ISO
  caloriesKcal: number;
  notes?: string;
};

type MealContextType = {
  meals: Meal[];
  addMeal: (m: Omit<Meal, "id">) => void;
  totalMealCaloriesToday: number;
};

const MealContext = createContext<MealContextType | undefined>(undefined);

export function MealProvider({ children }: { children: React.ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>([]);

  const addMeal = (m: Omit<Meal, "id">) => {
    setMeals((prev) => [{ id: nanoid(), ...m }, ...prev]);
  };

  const todayKey = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const totalMealCaloriesToday = useMemo(() => {
    const todayMeals = meals.filter((m) => m.date.startsWith(todayKey));
    return todayMeals.reduce((sum, m) => sum + (Number(m.caloriesKcal) || 0), 0);
  }, [meals, todayKey]);

  const value = useMemo(
    () => ({ meals, addMeal, totalMealCaloriesToday }),
    [meals, totalMealCaloriesToday]
  );

  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
}

export function useMeals() {
  const ctx = useContext(MealContext);
  if (!ctx) throw new Error("useMeals must be used inside MealProvider");
  return ctx;
}
