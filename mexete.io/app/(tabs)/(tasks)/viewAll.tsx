import { StyleSheet, SafeAreaView, View, Text, Dimensions } from 'react-native';
import ViewAllComponent from '@/components/ViewAllTasks';
import tasks from '@/assets/data/tasks';
import CalendarComponent from '@/components/CalendarComponent';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';

const { width } = Dimensions.get('window');

export default function ViewAllTasks() {
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
          <ThemedText style={styles.monthYearText}>
            {currentMonthYear.month} {currentMonthYear.year}
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
          <ViewAllComponent
            tasks={tasks.filter(task => {
              const taskDate = task.date
                ? new Date(task.date).toISOString().split('T')[0]
                : ''; // Fallback if task.date is undefined
              return taskDate === selectedDate;
            })}
          />
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
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  con_calender: {
    flex: 1 / 9,
    backgroundColor: '#fff',
    width: width,
    marginTop: 10,
    marginBottom: 10,
  },
  flatList_con: {
    flex: 0.8,
  },
});