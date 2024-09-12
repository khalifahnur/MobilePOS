import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { ModalPortal } from "react-native-modals";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Provider } from "react-redux";
import { Store } from "@/redux/store/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loaded] = useFonts({
    //SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    PlusJakartaSansMedium: require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    PlusJakartaSansRegular: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 1000);
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={Store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="screens/cart" />
          <Stack.Screen name="screens/search" />
          <Stack.Screen
            name="screens/product"
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen name="screens/checkout" />
          <Stack.Screen
            name="screens/filter"
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen name="screens/details" />
          <Stack.Screen name="screens/account" />
          <Stack.Screen name="screens/addSection" />
        </Stack>
        <ModalPortal />
      </ThemeProvider>
    </Provider>
  );
}
