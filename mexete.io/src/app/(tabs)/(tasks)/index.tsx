import { StyleSheet, SafeAreaView, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import ViewAllComponent from '../../../components/ViewAllTasks';
import CalendarComponent from '../../../components/CalendarComponent';
import { useEffect, useState } from 'react';
import { ThemedText } from '../../../components/ThemedText';
import { Link } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../../../lib/supabase';
import { useAuth } from '@/src/providers/AuthProvider';

const { height, width } = Dimensions.get('screen');

export default function ViewAllTasks() {

  const [taskData, setTaskData] = useState<any[]>([]);
  useEffect(() => {
    const fetchTasks = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let { data, error } = await supabase.from('tasks').select('*').eq('user_id', user.id)
      if (error) {
        Alert.alert('Error fetching tasks');
        return;
      }
      if (data) {
        setTaskData(data);
      }
    };

    fetchTasks();
  }, []);
 
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


  const getFilteredTasks = () => {
    return taskData.filter(task => {
      // Assuming your task data has a 'date' field
      // Convert both dates to YYYY-MM-DD format for comparison
      const taskDate = new Date(task.date).toISOString().split('T')[0];
      return taskDate === selectedDate;
    });
  };


  return (

    <SafeAreaView style={styles.mainContainer}>
      <View>
        {/* Month and Year Header */}
        <View style={styles.monthYearContainer}>
          <ThemedText type='title'>
            {currentMonthYear.month || ''} {currentMonthYear.year || ''}
          </ThemedText>
        </View>

        {/* Calendar Component */}
        <View style={styles.con_calender}>
          <CalendarComponent
            selectedDate={selectedDate}
            onDateChange={handleDateChange} // Pass date change handler
            onMonthChange={handleMonthChange} // Pass month change handler
          />
        </View>

        {/* Task List */}
        <View style={styles.flatList_con}>
          {getFilteredTasks().length > 0 ? (
            <ViewAllComponent tasks={getFilteredTasks()} />
          ) : (
            <ThemedText style={{ marginTop: 50, alignSelf: 'center' }} type="title">No tasks found for this date</ThemedText>
          )}
        </View>
        <View style={styles.footer}>
          <LinearGradient colors={["#FF3131", "#FF9F31"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradientBorder}>
            <TouchableOpacity>
              <Link href={'/createTask'} onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                <View style={styles.text_box}>
                  <AntDesign name="plus" size={24} color="white" />
                  <ThemedText style={{ marginLeft: 5 }} type='subtitle'>Task</ThemedText>
                </View>
              </Link>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  monthYearContainer: {
    marginTop: 30,
    marginLeft: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  con_calender: {
    flex: 0.1,
    shadowColor: 'transparent',
    width: width,
    marginTop: 10,
    marginBottom: 10,
  },
  flatList_con: {
    flex: 0.8,
  },
  // CREATE BUTTON 
  footer: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    marginTop: height * 0.76
  },
  plus_box: {
    backgroundColor: 'transparent',
    marginRight: 20,
    marginTop: height * 0.73
  },
  gradientBorder: {
    borderRadius: 10,
    width: 300,   // Explicit width
    height: 40,  // Explicit height
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_box: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  }
});