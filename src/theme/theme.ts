import { DarkTheme, Theme } from "@react-navigation/native";
import { colors } from "./color";

export const navDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.bg,
    card: colors.card,
    text: colors.text,
    border: colors.border,
    primary: colors.purple2,
    notification: colors.purple2,
  },
};
