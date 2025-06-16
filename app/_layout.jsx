import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { ThemeProvider } from "../context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { Appearance, Platform } from "react-native";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const theme =
    Appearance.getColorScheme() === "dark" ? Colors.dark : Colors.light;
  const isAndroid = Platform.OS === "android" ? true : false;

  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.headerBackgroundColor },
          headerTintColor: theme.headerColor,
          headerShadowVisible: true,
          headerShown: isAndroid,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="[todo]"
          options={{
            title: "Update Todos",
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
