import { Stack } from 'expo-router';
import React from 'react';

export default function ProfilesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: 'Profile', headerShown:false}}/>
    </Stack>
  );
}
