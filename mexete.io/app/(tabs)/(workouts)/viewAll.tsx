import { StyleSheet, SafeAreaView, View, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { MainWorkoutComponent } from '@/components/MainWorkoutComponent';
import workouts from '@/assets/data/workouts';
import { WorkoutComponent } from '@/components/WorkoutComponent';
import { ViewAllWorkoutsComponent } from '@/components/ViewAllWorkoutsComponent';

const { width } = Dimensions.get('window');

export default function ViewAllWorkouts() {
  return (
   <SafeAreaView style={styles.mainContainer}>
    <View>
      <View style={styles.con_calender}>
        <View style={styles.calender_layout}>
          <ThemedText style={{color:'#000'}}>Calendar</ThemedText>
        </View>
      </View>
      <View style={styles.container}>
          <ViewAllWorkoutsComponent workouts={workouts}/>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
    alignItems:'center',
    flexDirection:'column',
  },
  con_calender:{
    flex:1/8,
    backgroundColor:'#fff',
    width: width,
    marginTop:20,
    marginBottom:10,
  },
  calender_layout:{
    margin:10,
  },
  container: {
    flex:0.8,
    flexDirection: 'row',
    alignSelf:'flex-start',
  },
  wBox2:{
    width:width*0.4,
    marginLeft:10,
    height:255,
  },
});
