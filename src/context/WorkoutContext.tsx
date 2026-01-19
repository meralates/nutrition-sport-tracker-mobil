import React, { createContext, useContext, useMemo, useState } from "react";
import { nanoid } from "nanoid/non-secure";

export type Workout = {
  id: string;
  title: string;
  date: string; // ISO
  durationMin: number;
  burnedKcal: number;
  notes?: string;
};

type WorkoutContextType = {
  workouts: Workout[];
  addWorkout: (w: Omit<Workout, "id">) => void;
  totalCaloriesToday: number;
  totalDurationToday: number;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const addWorkout = (w: Omit<Workout, "id">) => {
    setWorkouts((prev) => [{ id: nanoid(), ...w }, ...prev]);
  };

  const today = new Date().toISOString().slice(0, 10);

  const todayWorkouts = workouts.filter((w) => w.date.startsWith(today));

  const totalCaloriesToday = todayWorkouts.reduce((sum, w) => sum + w.burnedKcal, 0);
  const totalDurationToday = todayWorkouts.reduce((sum, w) => sum + w.durationMin, 0);

  const value = useMemo(
    () => ({ workouts, addWorkout, totalCaloriesToday, totalDurationToday }),
    [workouts, totalCaloriesToday, totalDurationToday]
  );

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
}

export function useWorkouts() {
  const ctx = useContext(WorkoutContext);
  if (!ctx) throw new Error("useWorkouts must be used inside WorkoutProvider");
  return ctx;
}
