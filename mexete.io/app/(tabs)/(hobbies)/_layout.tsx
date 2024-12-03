import {  Stack } from 'expo-router';

export default function TasksLayout() {
  return  <Stack >
            <Stack.Screen name="(tasks)" options={{title: 'Tasks', headerShown:false}}/>

  </Stack>
};