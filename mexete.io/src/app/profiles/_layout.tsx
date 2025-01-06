import { AntDesign, Entypo } from '@expo/vector-icons';
import { Stack, useNavigation, useRouter } from 'expo-router';
import { reload } from 'expo-router/build/global-state/routing';
import React, { useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function ProfilesLayout() {
  const router = useRouter();


  const handleDismissAll = () => {
    router.dismissTo('/profiles');
  };

  return (
    <Stack>
    <Stack.Screen name="index" options={{headerShown:false}}/>
    <Stack.Screen
      name="calendar"
      options={{
        title: 'Calendar',
        presentation: 'modal',
        animation: 'slide_from_bottom',
        headerShown: true,
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerRight: () => (
          <TouchableOpacity onPress={handleDismissAll}>
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
        ),
      }}
    />
       <Stack.Screen name="settings" options={{ title: 'Settings',
        headerShown: false,  // Make sure this is true to show the Settings header
        }} />

    </Stack>
  );
}
