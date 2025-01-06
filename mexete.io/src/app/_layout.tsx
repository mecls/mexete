  import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
  import { useFonts } from 'expo-font';
  import { Redirect, router, Stack } from 'expo-router';
  import * as SplashScreen from 'expo-splash-screen';
  import { StatusBar } from 'expo-status-bar';
  import { useEffect, useState } from 'react';
  import 'react-native-reanimated';
  import { useColorScheme } from '../hooks/useColorScheme';
  import { TouchableOpacity } from 'react-native';
  import { Entypo } from '@expo/vector-icons';
  import AuthProvider, { useAuth } from '../providers/AuthProvider';

  export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
  } from 'expo-router';
  export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(auth)/signIn',
  };
  SplashScreen.preventAutoHideAsync();

  export default function RootLayout() {
    const [loaded, error] = useFonts({
      SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
      if (error) throw error;
    }, [error]);

    useEffect(() => {
      if (loaded) {
        SplashScreen.hideAsync();
      }
    }, [loaded]);

    if (!loaded) {
      return null;
    }

    return <RootLayoutNav />;
  }

  function RootLayoutNav() {

    const colorScheme = useColorScheme();

    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false , title: 'Sign In'}}/>
            <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Main' }} />
            <Stack.Screen
              name="profiles"
              options={{
                title: 'Profile',
                headerShown: true,
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
                headerTransparent: true,
                headerRight: () => (
                  <TouchableOpacity onPress={() => router.navigate('/profiles/settings')}>
                    <Entypo
                      style={{ marginRight: 10 }}
                      name="dots-three-horizontal"
                      size={28}
                      color="white"
                    />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen name="+not-found" />
            <StatusBar style="auto" />
          </Stack>
        </AuthProvider>
      </ThemeProvider>
    );
  }



