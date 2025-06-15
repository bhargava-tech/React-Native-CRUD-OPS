import { createContext, useState } from "react";
import { Appearance, Platform } from "react-native";
import { Colors } from "../constants/Colors";

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const isAndroid = Platform.OS === "android" ? true : false;

  return (
    <ThemeContext.Provider
      value={{ colorScheme, setColorScheme, theme, isAndroid }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
