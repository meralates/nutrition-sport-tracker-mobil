import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "@/screens/home/HomeScreen";
import MealsScreen from "@/screens/meal/MealsScreen";
import WorkoutsStack from "@/navigation/WorkoutsStack";
import ProfileScreen from "@/screens/profile/ProfileScreen";
import { colors } from "@/theme/color";

export type AppTabParamList = {
  Home: undefined;
  Meals: { openAdd?: boolean } | undefined;
  Workouts: { openAdd?: boolean } | undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

const ICONS: Record<keyof AppTabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: "home",
  Meals: "restaurant",
  Workouts: "barbell",
  Profile: "person",
};

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.purple2,
        tabBarInactiveTintColor: colors.muted,
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={ICONS[route.name as keyof AppTabParamList]}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Meals" component={MealsScreen} />
<Tab.Screen name="Workouts" component={WorkoutsStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
