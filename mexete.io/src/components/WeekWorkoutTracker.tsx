import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import workouts from '../assets/data/workouts'
import { ThemedText } from './ThemedText';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

const WeekWorkoutTracker = () => {

  const titles = workouts.map((w) => w.title.toString());

  //Counts the number of workouts that are runs
  //1st - Make it for the week
  //2nd - Make it for the finished ones

  const numOfRuns = workouts.filter(workout => workout.title === "Run").length;
  const numOfGyms = workouts.filter(workout => workout.title === "Gym").length;
  const totalTime = () => {
    let count = 0;
    for (let i = 0; i < workouts.length; i++) {
      if (workouts[i].description && workouts[i].description.totalTime) {
        count += workouts[i].description.totalTime; // Safely access totalTime
      }
    }
    return count; // Return the accumulated count
  };


  if (workouts.length === 0)
    return (
      // IF THERE IS NO WORKOUTS
      <View style={styles.stats_container}>
        <View style={styles.subcontainer3}>
          <ThemedText type='subtitle'>Week Stats</ThemedText>
          <View style={styles.mBox}>
            <View style={{ marginTop: 95, marginLeft: 10 }}>
              <ThemedText type='default'>After you start using the app this will update</ThemedText>
            </View>
            <View style={styles.m_infoContainerStats}>
              <TouchableOpacity onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                <FontAwesome5 name="info-circle" size={24} color="#636363" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  else {
    return (
      // IF THERE ARE WORKOUTS
      <View style={styles.stats_container}>
        <View style={styles.subcontainer3}>
          <ThemedText type='title'>Week Stats</ThemedText>
          <View style={styles.mBox}>
            <View>

              {/* IF WORKOUT WAS CHECKED THEN BOX BECAMES COLOURED */}
              <View style={styles.weekBox}>
                <View style={styles.box}>
                  <ThemedText style={{fontWeight:'bold',color:'#000'}}>Mon</ThemedText>
                </View>
                <View style={styles.box}>
                  <ThemedText style={{fontWeight:'bold',color:'#000'}}>Tue</ThemedText>
                </View>
                <View style={styles.box}>
                  <ThemedText style={{fontWeight:'bold',color:'#000'}}>Wed</ThemedText>
                </View>
                <View style={styles.box}>
                  <ThemedText style={{fontWeight:'bold',color:'#000'}}>Thu</ThemedText>
                </View>
                <View style={styles.box}>
                  <ThemedText style={{fontWeight:'bold', color:'#000'}}>Fri</ThemedText>
                </View>
                <View style={styles.box}>
                  <ThemedText style={{fontWeight:'bold',color:'#000'}}>Sat</ThemedText>
                </View>
                <View style={styles.box}>
                  <ThemedText style={{fontWeight:'bold',color:'#000'}}>Sun</ThemedText>
                </View>
              </View>
              {/* TEXT */}
              <View style={{ marginTop: 5, alignSelf: 'flex-start', marginLeft: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <ThemedText style={{fontWeight:'bold', fontSize:16}} type='defaultSemiBold'>{titles[0]}s:</ThemedText>
                  <ThemedText style={{ marginLeft: 5, fontSize:14}} type='defaultSemiBold'>{numOfRuns}</ThemedText>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline', marginLeft:20 }}>
                    <ThemedText style={{fontWeight:'bold', fontSize:16}} type='defaultSemiBold'>{titles[1]} Sessions:</ThemedText>
                    <ThemedText style={{ marginLeft: 5,fontSize:14}} type='defaultSemiBold'>{numOfGyms}</ThemedText>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop:5 }}>
                  <ThemedText style={{fontWeight:'bold', fontSize:16}} type='defaultSemiBold'>Total Time:</ThemedText>
                  <ThemedText style={{ marginLeft: 5,fontSize:14}} type='defaultSemiBold'>{totalTime()} min</ThemedText>
                </View>
              </View>
            </View>
            <View style={styles.m_infoContainerStats}>
              <TouchableOpacity onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                <FontAwesome5 name="info-circle" size={24} color="#636363" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

}

export default WeekWorkoutTracker

const styles = StyleSheet.create({
  stats_container: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10
  },
  subcontainer3: {
    flex: 1,
  },
  mBox: {
    width: width * 0.95,
    height: 150,
    marginTop: 5,
    padding: 10,
    position: 'static',
    alignSelf: 'flex-start',
    backgroundColor: '#202020',
    borderCurve: 'continuous',
    borderRadius: 20,
  },
  m_infoContainerStats: {
    alignSelf: 'flex-end',
    position: 'absolute',
    marginTop: 110,
    paddingRight: 5,
  },
  weekBox: {
    flexDirection: 'row',        // Keep boxes in a horizontal row
    justifyContent: 'space-around', // Space boxes evenly
    alignItems: 'center',        // Vertically center the content
    borderColor: '#363636',      // Border color (blue)
    borderWidth: 4,              // Thickness of the border
    borderRadius: 10,            // Rounded corners
    padding: 3,                 // Space inside the container
    backgroundColor: 'transparent',     // Optional: Background color for the group
    margin: 5,                  // Space outside the container
  },
  box: {
    height: 35,
    width: 35,
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 5,
    alignItems: 'center', // Centers text horizontally
    justifyContent: 'center', // Centers text vertically
  }
})