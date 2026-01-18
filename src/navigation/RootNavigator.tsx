import React, { useState } from "react";
import AuthStack from "@/navigation/AuthStack";
import AppTabs from "@/navigation/AppTabs";

// Şimdilik fake auth: true yaparsan direkt tab'a girer
export default function RootNavigator() {
  const [isAuthed] = useState(true);

  return isAuthed ? <AppTabs /> : <AuthStack />;
}
