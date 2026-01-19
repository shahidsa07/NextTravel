
import React from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { ThemeProvider } from '../constants/theme'; // A custom theme provider

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // 'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    // 'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ title: 'Login' }} />
        <Stack.Screen name="services/list" options={{ title: 'Services' }} />
        <Stack.Screen name="services/[id]" options={{ title: 'Service Details' }} />
        <Stack.Screen name="search/results" options={{ title: 'Search Results' }} />
      </Stack>
    </ThemeProvider>
  );
}
