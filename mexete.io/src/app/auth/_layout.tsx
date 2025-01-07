import { useAuth } from '../../providers/AuthProvider';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={'/'} />;
  }
  

  return <Stack>
    <Stack.Screen name="index" options={{headerShown:false}}/>
    <Stack.Screen name="signUp" options={{ headerShown: false }} />
  </Stack>;
}