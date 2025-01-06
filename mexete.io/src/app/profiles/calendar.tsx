import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CalendarList } from 'react-native-calendars'

const Calendar = () => {
    return (
      <View style={styles.container}>
        <CalendarList
          // Add some basic props for better appearance and functionality
          horizontal={false}
          pagingEnabled={true}
          calendarStyle={styles.calendar}
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
            monthTextColor:'#fff'
        }}
          // You can add markedDates prop here to highlight specific dates
          // markedDates={{
          //   '2024-03-20': {marked: true, dotColor: '#50cebb'},
          //   '2024-03-21': {marked: true, dotColor: '#50cebb'}
          // }}
        />
      </View>
    )
  }
  
  export default Calendar
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    calendar: {
      paddingHorizontal: 10,
      backgroundColor:'#000'
    }
  })