import { StyleSheet, SafeAreaView, View, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Calendar, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import tasks from '@/assets/data/tasks';
import CalendarComponent from '@/components/CalendarComponent';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container} >
        <ThemedText style={{alignSelf:'center', paddingTop:5}} type="title">Profile Page</ThemedText>
       
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
  container: {
    flex:1
  },
});
