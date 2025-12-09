import CartProvider from "@/providers/CartProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "../components/useColorScheme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
//! otomatik kapanmayı engeller arkada sayfa oluşturulurken yüklenirken
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  //! fontlar yüklenirkenki durumları kontrol eder
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  //! hata oluşursa hata fırlatır
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  //! fontlar yüklenirkenki durumları kontrol eder
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  //! fontlar yüklenmediyse null döner
  if (!loaded) {
    return null;
  }

  //! fontlar yüklenmişse RootLayoutNav döner
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  //! root layout
  return (
    //! tema değiştirir
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <CartProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen name="cart" options={{ presentation: "modal" }} />
        </Stack>
      </CartProvider>
    </ThemeProvider>
  );
}
//! her zaman ilk çalışır fontlar yüklene kadar bekler
//!assetleri önceden yükleyebilir
//!kullanıcı tokenlerını kontrole eder
//!ilgili wrapperlar burada sarmalalnır store vb
//! notification a bağlanacaksa usffectle kontrol edilir app js gibi davranır
//! kamera izinlerini kontrol eder
//!google analytics bağlanacaksa usffectle kontrol edilir app js gibi davranır
//!crash reportlarını kontrol eder
//!deeplinking
