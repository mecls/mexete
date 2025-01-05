import { useState, useMemo, useEffect } from 'react';
import { CalendarProvider, CalendarUtils, WeekCalendar } from 'react-native-calendars';
import { View, StyleSheet, Alert } from 'react-native';
import { MarkedDatesType, PriorityLevel } from '@/assets/types';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '@/lib/supabase';

const getPriorityColor = (level: number | undefined) => {
    switch (level) {
        case 1:
            return '#FF3131'; // High priority - Red
        case 2:
            return '#FF9F31'; // Medium priority - Orange
        case 3:
            return '#31FF5E'; // Low priority - Green
        default:
            return '#636363'; // Default color - Grey
    }
};

const CalendarComponent = ({ selectedDate, onDateChange, onMonthChange }: any) => {
    const [selected, setSelected] = useState(selectedDate);
    const [tasks, setTasks] = useState<any[]>([]);

    // Updated useEffect to fetch tasks
    useEffect(() => {
        const fetchTasks = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .eq('user_id', user.id)

            if (error) {
                Alert.alert('Error fetching tasks');
                return;
            }
            if (data) {
                setTasks(data);
            }
        };

        fetchTasks();
    }, []);

    const handleDateSelection = (date: string) => {
        const newSelectedDate = new Date(date);
        setSelected(newSelectedDate);
        onDateChange(date);

        const tasksForDate = tasks.filter((task: { date: string }) => {
            const taskDate = new Date(task.date).toISOString().split('T')[0];
            return taskDate === date;
        });

        //console.log('Tasks for selected date:', tasksForDate);
    };

    const marked = useMemo(() => {
        const markedDates: MarkedDatesType = {};

        // Mark dates that have tasks
        tasks.forEach((task: { date: string | number | Date; priority_level: number; }) => {
            if (task.date) {
                const taskDate = new Date(task.date).toISOString().split('T')[0];
                if (!markedDates[taskDate]) {
                    markedDates[taskDate] = {
                        dots: [],
                        marked: true,
                        dotColor: getPriorityColor(task.priority_level),
                    };
                }
            }
        });
        // Mark selected date - Add null check and ensure it's a Date object
        if (selected) {
            const selectedDate = new Date(selected);
            const selectedDateString = selectedDate.toISOString().split('T')[0];
            markedDates[selectedDateString] = {
                ...markedDates[selectedDateString],
            };
        }
        return markedDates;
    }, [selected, tasks]);
    // New useMemo for selected date
    
    return (
        <View style={styles.container}>
            <CalendarProvider date={selectedDate} onDateChanged={handleDateSelection} style={{ marginBottom: 10 }}>
                <WeekCalendar
                    testID={tasks[0]?.id ? `task_${tasks[0].id}` : 'calendar'}
                    onDayPress={(day) => {
                        handleDateSelection(day.dateString);
                    }}
                    firstDay={1}
                    onMonthChange={(monthInfo) => {
                        // Call the passed onMonthChange handler
                        if (onMonthChange) {
                            onMonthChange(monthInfo);
                        }
                    }}
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