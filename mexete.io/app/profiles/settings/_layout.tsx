import { router, Stack } from 'expo-router';
import React from 'react';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsLayout() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        // Hide the parent navigation header
        navigation.getParent()?.setOptions({
          headerShown: false,  // Changed from true to false
        });
      

        // Cleanup function to restore the header when leaving this screen
        return () => {
          navigation.getParent()?.setOptions({
            headerShown: true,
          });
        };
      }, [navigation]);

  return <Stack>
            <Stack.Screen 
              name="index" 
              options={{
                title: 'Settings',
                headerShown: true,  // Make sure this is true to show the Settings header
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
                headerBackButtonDisplayMode: 'minimal',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                      <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>
                  ),
              }}
            />
          </Stack>
};