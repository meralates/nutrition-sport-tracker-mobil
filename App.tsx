import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "@/navigation/RootNavigator";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { navDarkTheme } from "@/theme/theme";

export default function App() {
  return (
    <WorkoutProvider>
      <NavigationContainer theme={navDarkTheme}>
        <RootNavigator />
      </NavigationContainer>
    </WorkoutProvider>
  );
}
