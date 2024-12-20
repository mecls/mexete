import { StyleSheet, SafeAreaView, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import ViewAllComponent from '@/components/ViewAllTasks';
import tasks from '@/assets/data/tasks';


export default function ViewAllWorkouts() {
  return (
   <SafeAreaView style={styles.mainContainer}>
    <View>
        <ThemedText>View All workouts</ThemedText>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex:0.8,
    marginTop:20,
    alignItems:'center',
    flexDirection:'column',
  },
});
