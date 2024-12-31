import { StyleSheet, SafeAreaView, View, Dimensions, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { MainWorkoutComponent } from '@/components/MainWorkoutComponent';
import workouts from '@/assets/data/workouts';
import { WorkoutComponent } from '@/components/WorkoutComponent';
import { ViewAllWorkoutsComponent } from '@/components/ViewAllWorkoutsComponent';
import { useState } from 'react';
import ViewAllWorkoutsCal from '@/components/ViewAllWorkoutsCal';
import { Link } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('screen');

export default function ViewAllWorkouts() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today

  const [currentMonthYear, setCurrentMonthYear] = useState({
    month: new Date().toLocaleString('default', { month: 'long' }),
    year: new Date().getFullYear(),
  });

  const handleDateChange = (date: any) => {

    setSelectedDate(date); // Update selected date when a day is clicked
    const newDateObject = new Date(date);
    const monthName = newDateObject.toLocaleString('default', { month: 'long' });
    const year = newDateObject.getFullYear();

    setCurrentMonthYear({
      month: monthName,
      year: year,
    });
  };

  const handleMonthChange = (monthInfo: { year: number; month: number }) => {
    const { year, month } = monthInfo;
    const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });

    setCurrentMonthYear({
      month: monthName,
      year: year,
    });
  };

  return (
   <SafeAreaView style={styles.mainContainer}>
    <View>
      {/* Month and Year Header */}
      <View style={styles.monthYearContainer}>
          <ThemedText type='title' >
            {currentMonthYear.month} {currentMonthYear.year}
          </ThemedText>
        </View>
        {/* Calendar Component */}
        <View style={styles.con_calender}>
          <ViewAllWorkoutsCal
            selectedDate={selectedDate}
            onDateChange={handleDateChange} // Pass date change handler
            onMonthChange={handleMonthChange} // Pass month change handler
          />
        </View>
      <View style={styles.container}>
          <ViewAllWorkoutsComponent workouts={workouts.filter(workout => {
              const workoutDate = workout.date
                ? new Date(workout.date).toISOString().split('T')[0]
                : ''; // Fallback if task.date is undefined
              return workoutDate === selectedDate;
            })}
         />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.plus_box}>
          <Link href={'/createTask'} onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
            <AntDesign name="pluscircleo" size={55} color="white" />
          </Link>
        </TouchableOpacity>
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
    flex:1/9,
    backgroundColor:'#fff',
    width: width,
    marginTop:10,
    marginBottom:10,
  },
  calender_layout:{
    margin:10,
  },
  monthYearContainer: {
    marginTop: 30,
    marginLeft:20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  container: {
    flex:0.8,
    flexDirection: 'row',
    alignSelf:'flex-start',
  },
  footer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    position:'absolute',
  },
  wBox2:{
    width:width*0.4,
    marginLeft:10,
    height:255,
  },
  plus_box: {
    backgroundColor: 'transparent',
    marginRight:50,
    marginTop: height*0.73
  },
});
