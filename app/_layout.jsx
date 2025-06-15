import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { ThemeProvider } from "../context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { Appearance } from "react-native";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const theme =
    Appearance.getColorScheme() === "dark" ? Colors.dark : Colors.light;

  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.headerBackgroundColor },
          headerTintColor: theme.headerColor,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="homescreen"
          options={{
            title: "Home",
            headerShown: true,
          }}
        />
        <Stack.Screen name="explore" options={{ headerShown: true }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
