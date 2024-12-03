import { StyleSheet, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';

export default function TasksScreen() {
  return (
    <SafeAreaView>
        <ThemedText type="title">Tasks Page</ThemedText>
      <Link href={'/createTask'}>
      <ThemedText >All Tasks</ThemedText>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
