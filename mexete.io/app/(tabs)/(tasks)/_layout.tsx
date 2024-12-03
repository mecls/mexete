import {  Stack, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
export default function TasksLayout() {
  const router = useRouter();

  const handleDismissAll = () => {
    router.dismissTo('/');
  };
  return  <Stack >
            <Stack.Screen name="index" options={{title: 'Tasks', headerShown:false}}/>
            {/* <Stack.Screen name="createTask" options={{title: 'Create Task',presentation:'modal',headerShown:true, headerTintColor:'#fff'}}/> */}
            <Stack.Screen
              name="createTask"
              options={{
                title: 'Create Task',
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