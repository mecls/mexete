import { StyleSheet, SafeAreaView, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';


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
