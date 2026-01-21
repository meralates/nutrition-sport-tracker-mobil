import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";

import { useAuth } from "@/screens/auth/AuthContext";
import AppTabs from "@/navigation/AppTabs";
import AuthStack from "@/navigation/AuthStack";

export default function RootNavigator() {
  const { isBooting, isAuthed } = useAuth();

  if (isBooting) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthed ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
