import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PaperProvider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const settings = () => {
    router.navigate('/profiles/settings');  // Add forward slash to make it an absolute path
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
         {/* <Stack.Screen name='(auth)' options={{ headerShown: false, title: 'Account' }} /> */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Main' }} />
          <Stack.Screen name="profiles" options={{
            title: 'Profile', headerShown: true, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' }, headerTransparent: true,
            headerRight: () => (
              <TouchableOpacity onPress={settings}>
                <Entypo style={{ marginRight: 10 }} name="dots-three-horizontal" size={28} color="white" />
              </TouchableOpacity>
            ),
          }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}
