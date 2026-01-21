import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "@/navigation/RootNavigator";
import { navDarkTheme } from "@/theme/theme";
import { StatusBar } from "expo-status-bar";

import { WorkoutProvider } from "@/context/WorkoutContext";
import { MealProvider } from "@/context/MealContext";

export default function App() {
  return (
    <MealProvider>
      <WorkoutProvider>
        <NavigationContainer theme={navDarkTheme}>
          <StatusBar style="light" />
          <RootNavigator />
        </NavigationContainer>
      </WorkoutProvider>
    </MealProvider>
  );
}
