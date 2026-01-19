import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WorkoutsScreen from "@/screens/workout/WorkoutsScreen";
import AddWorkoutScreen from "@/screens/workout/AddWorkoutScreen";

export type WorkoutsStackParamList = {
  WorkoutsMain: undefined;
  AddWorkout: undefined;
};

const Stack = createNativeStackNavigator<WorkoutsStackParamList>();

export default function WorkoutsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="WorkoutsMain" component={WorkoutsScreen} />
      <Stack.Screen name="AddWorkout" component={AddWorkoutScreen} />
    </Stack.Navigator>
  );
}
