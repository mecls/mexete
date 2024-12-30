import { StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import {CalendarProvider, WeekCalendar } from 'react-native-calendars';
import tasks from '@/assets/data/tasks';
const CalendarComponent = ({ selectedDate, onDateChange, onMonthChange}: any) => {
    return (
        <View style={styles.container}>
            <CalendarProvider date={selectedDate}  onDateChanged={onDateChange}>
                <WeekCalendar
                    testID={`task_${tasks[0]?.id}`} // Assign testID dynamically based on task ID
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
                    theme={{todayTextColor: 'red', // Change to match your design
                        backgroundColor: 'black',
                        calendarBackground: 'black',
                        textDayFontFamily: 'bold',
                        textDayFontWeight: 'bold',
                        textMonthFontWeight: 'bold',
                        textDisabledColor: 'gray',
                        selectedDayBackgroundColor: 'red',
                        dotColor: '#fff',
                    }}
                    markedDates={{
                        [selectedDate]: {
                          selected: true,
                          disableTouchEvent: true,
                          selectedColor: 'red',
                          selectedTextColor: 'white',
                        },
                      }}
                />
            </CalendarProvider>
        </View>
    );
};

export default CalendarComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        elevation:0
    },

});