import {  Stack, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function WorkoutLayout() {
  const router = useRouter();

  const handleDismissAll = () => {
    router.dismissTo('/');
  };
  return  <Stack>
            <Stack.Screen name="index" options={{title: 'Workouts', headerShown:false}}/>
            <Stack.Screen
              name="createWorkout"
              options={{
                title: 'Create Workout',
                presentation: 'modal',
                animation:'slide_from_bottom',
                headerShown: true,
                headerTintColor: '#fff',
                headerTitleStyle:{fontWeight:'bold'},
                headerRight: () => (
                  <TouchableOpacity onPress={handleDismissAll}>
                  <AntDesign name="close" size={24} color="white" />
                  </TouchableOpacity>
                ),
              }}
            />
  </Stack>
};