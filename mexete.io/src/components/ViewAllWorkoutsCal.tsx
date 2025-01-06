import { useState, useMemo } from 'react';
import { CalendarProvider, WeekCalendar } from 'react-native-calendars';
import { View, StyleSheet } from 'react-native';
import workouts from '../assets/data/workouts';

const CalendarComponent = ({ selectedDate, onDateChange, onMonthChange }: any) => {
    const [selected, setSelected] = useState(new Date());

//   // Helper function to get dot color based on priority
//   const getColorByPriority = (priority: string | undefined) => {
//     switch (priority) {
//       case '1':
//         return 'red';
//       case '2':
//         return 'yellow';
//       case '3':
//         return 'green';
//       default:
//         return 'gray'; // Default color for unknown priority
//     }
//   };
//   const marked = useMemo(() => {
//     const markedDates: MarkedDatesType = {};
  
//     tasks.forEach((task) => {
//       if (task.date) {
//         const taskDate = new Date(task.date).toISOString().split('T')[0];
//         if (!markedDates[taskDate]) {
//           markedDates[taskDate] = {
//             dots: [
//             ],
//           };
//         }
//         markedDates[taskDate].dots.push({
//           color: getColorByPriority(task.priority_lvl),
//         });
//       }
//     });
  
//     const selectedDate = selected.toISOString().split('T')[0];
//     markedDates[selectedDate] = {
//     marked: true,
//       selectedColor: 'orange',
//       selectedTextColor: 'red',
//       dots: [],
//     };
  
//     return markedDates;
//   }, [selected,tasks]);
  

    const getItemCount=() => {
        return workouts.filter(workout => {
            const workoutDate = workout.date ? new Date(workout.date) : null;
            return workoutDate && workoutDate.toISOString().split('T')[0] === selectedDate.toString().split('T')[0];
        }).length;
    }

    const marked = useMemo(() => {
        return {
            [getItemCount().valueOf()]: {
                marked: true,
                dotColor: 'red',
            },
            [selected.toISOString().split('T')[0]]: { // Convert selected to ISO string and extract date part
                selected: true,
                selectedColor: 'transparent',
                selectedTextColor: 'red',
            },
        };
    }, [selected]);
    
    return (
        <View style={styles.container}>
            <CalendarProvider date={selectedDate} onDateChanged={onDateChange} style={{ marginBottom: 10 }} >
                <WeekCalendar

                    testID={`task_${workouts[0]?.id}`} // Assign testID dynamically based on task ID
                    onDayPress={(day) => {
                        onDateChange(day.dateString); // Notify parent when a date is clicked
                    }}
                    firstDay={1}
                    onMonthChange={(monthInfo) => {
                        // Call the passed onMonthChange handler
                        if (onMonthChange) {
                            onMonthChange(monthInfo);
                        }
                    }}
                    // markedDates={marked}
                    theme={{
                        todayTextColor: 'red', // Change to match your design
                        backgroundColor: '#010101',
                        calendarBackground: '#010101',
                        textDayFontWeight: 'bold',
                        textMonthFontWeight: 'bold',
                        textDisabledColor: 'gray',
                        selectedDayBackgroundColor: 'red',
                        dotColor: '#fff',
                        dayTextColor: '#fff',
                        textDayHeaderFontWeight: 'bold',

                    }}
                    markedDates={marked}
                    style={styles.cal_container}
                />

            </CalendarProvider>
        </View>
    );
};

export default CalendarComponent;

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        alignItems: 'flex-start',
        shadowColor: 'transparent',
        borderRadius: 10,
        borderCurve: 'continuous',
        // Remove elevation property
    },
    cal_container: {
        elevation: 0,
    }
});

function getColorByPriority(arg0: string): string {
    throw new Error('Function not implemented.');
}