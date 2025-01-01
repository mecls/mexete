import React, { useState } from 'react'
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
import { ThemedText } from './ThemedText';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Checkbox from 'expo-checkbox';
import * as Haptics from 'expo-haptics';
import WeekWorkoutTracker from './WeekWorkoutTracker';

const { width } = Dimensions.get('screen');


const Workout = ({ workout }: { workout: any[] }) => {
  
  const [workoutChecks, setWorkoutChecks] = useState(
    workout?.map(() => false) || []
  );

  const toggleSubtask = (index: number) => {
    const updatedChecks = [...workoutChecks];
    updatedChecks[index] = !updatedChecks[index];
    setWorkoutChecks(updatedChecks);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  };
  
    if (workout.length === 0) {
      return (
           <View style={styles.container2}>
                   <Text>Workout</Text>
                   <View style={styles.wBox2}>
                     {/* <TouchableOpacity onPress={()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                       <AntDesign name="pluscircleo" size={24} color="#636363" />
                     </TouchableOpacity> */}
                     <ThemedText type='subtitle'>You don't have workouts for today</ThemedText>
                   </View>
               </View>
      );
    } else if (workout.length === 1) {
      return (
        <View style={styles.container2}>
          {workout[0].title === "Run"?(
              <View key={workout[0].id} style={styles.wBox}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <ThemedText type='title'>{workout[0].title || 'No title available'}</ThemedText>
                   <Checkbox style={styles.checkbox} value={workoutChecks[workout[0].id]} onValueChange={() => toggleSubtask(workout[0].id)}/>
                   <ThemedText style={{alignSelf:'center', marginLeft:10}} type='defaultSemiBold'>[{workout[0].description.totalTime || 'No title available'}min]</ThemedText>
              </View>
              <ThemedText type='defaultSemiBold'>{workout[0].description.title || 'No title available'}</ThemedText>
              <View style={{alignContent:'center', padding:5, gap:5 }}>
                  <View style={{flexDirection:'row', alignItems:'baseline', gap:5}}>
                    <LinearGradient colors={["#FF3131", "#FF9F31"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradientBorder}> 
                    {/* To change the size of the whole box around the arrow just change this size */}
                     <FontAwesome name="arrow-right" size={12} color="white" /> 
                    </LinearGradient>                  
                     <ThemedText type='defaultSemiBold'>{workout[0].description.cooldown || 'No title available'}km warmup</ThemedText>
                  </View>
                  <View style={{flexDirection:'row', alignItems:'baseline', gap:5}}>
                    <LinearGradient colors={["#FF3131", "#FF9F31"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradientBorder}> 
                      <FontAwesome name="arrow-right" size={12} color="white" />
                    </LinearGradient>                  
                    <ThemedText type='defaultSemiBold'>{workout[0].description.split || 'No title available'} x {workout[0].description.splitTime || 'No title available'}min</ThemedText>
                  </View>
                  <View style={{flexDirection:'row', alignItems:'baseline', gap:5}}>
                    <LinearGradient colors={["#FF3131", "#FF9F31"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradientBorder}> 
                      <FontAwesome name="arrow-right" size={12} color="white" />
                    </LinearGradient>
                    <ThemedText type='defaultSemiBold'>{workout[0].description.rest || 'No title available'} x {workout[0].description.restTime || 'No title available'}min</ThemedText>
                  </View>
                  <View style={{flexDirection:'row', alignItems:'baseline', gap:5}}>
                    <LinearGradient colors={["#FF3131", "#FF9F31"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradientBorder}> 
                      <FontAwesome name="arrow-right" size={12} color="white"/>
                    </LinearGradient>                  
                    <ThemedText type='defaultSemiBold'>{workout[0].description.cooldown || 'No title available'}km cooldown</ThemedText>
                  </View>
                </View>
              </View>
          ):(
            <View key={workout[0].id} style={styles.wBox}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <ThemedText type='title'>{workout[0].title || 'No title available'}</ThemedText>
                 <Checkbox style={styles.checkbox} value={workoutChecks[workout[0].id]} onValueChange={() => toggleSubtask(workout[0].id)}/>
                 <ThemedText style={{alignSelf:'center', marginLeft:10}} type='defaultSemiBold'>[{workout[0].description.totalTime || 'No title available'}min]</ThemedText>
            </View>
            <ThemedText type='defaultSemiBold'>{workout[0].description.title || 'No title available'}</ThemedText>
            </View>
          )}
              
            <View style={styles.infoContainer2}>
                <TouchableOpacity onPress={()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                  <FontAwesome5 name="info-circle" size={24} color="#636363" />
                </TouchableOpacity>
              </View>
        </View>
        
      );
    } else if (workout.length >= 2) {
      return (
        <View style={styles.container}>
          {/* Gets the workoutItem (Its a workout) from the workout table  */}
          {workout.map((workoutItem) => (
            <View key={workoutItem.id} style={styles.wBox}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <ThemedText type='title'>{workoutItem.title || 'No title available'}</ThemedText>
                 <Checkbox style={styles.checkbox} value={workoutChecks[workoutItem.id]} onValueChange={() => toggleSubtask(workoutItem.id)}/>
                 <ThemedText style={{alignSelf:'center', marginLeft:10}} type='defaultSemiBold'>[{workoutItem.description.totalTime || 'No title available'}min]</ThemedText>
            </View>
              <ThemedText type='defaultSemiBold'>{workoutItem.description.title || 'No title available'}</ThemedText>
              {/* If the workout type is Run then shows the running format if not shows the other one */}
              {workoutItem.title === "Run"?(
              <View style={{alignContent:'center', padding:5, gap:5 }}>
                <View style={{flexDirection:'row', alignItems:'baseline', gap:5}}>
                  <LinearGradient colors={["#FF3131", "#FF9F31"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradientBorder}> 
                  {/* To change the size of the whole box around the arrow just change this size */}
                   <FontAwesome name="arrow-right" size={12} color="white" /> 
                  </LinearGradient>                  
                   <ThemedText type='defaultSemiBold'>{workoutItem.description.cooldown || 'No title available'}km warmup</ThemedText>
                </View>
                <View style={{flexDirection:'row', alignItems:'baseline', gap:5}}>
                  <LinearGradient colors={["#FF3131", "#FF9F31"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradientBorder}> 
                    <FontAwesome name="arrow-right" size={12} color="white" />
                  </LinearGradient>                  
                  <ThemedText type='defaultSemiBold'>{workoutItem.description.split || 'No title available'} x {workoutItem.description.splitTime || 'No title available'}min</ThemedText>
                </View>
                <View style={{flexDirection:'row', alignItems:'baseline', gap:5}}>
                  <LinearGradient colors={["#FF3131", "#FF9F31"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradientBorder}> 
                    <FontAwesome name="arrow-right" size={12} color="white" />
                  </LinearGradient>
                  <ThemedText type='defaultSemiBold'>{workoutItem.description.rest || 'No title available'} x {workoutItem.description.restTime || 'No title available'}min</ThemedText>
                </View>
                <View style={{flexDirection:'row', alignItems:'baseline', gap:5}}>
                  <LinearGradient colors={["#FF3131", "#FF9F31"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradientBorder}> 
                    <FontAwesome name="arrow-right" size={12} color="white"/>
                  </LinearGradient>                  
                  <ThemedText type='defaultSemiBold'>{workoutItem.description.cooldown || 'No title available'}km cooldown</ThemedText>
                </View>
              </View>
              ):(
                <View>
                  
              </View>
              )}


              <View style={styles.infoContainer}>
                <TouchableOpacity onPress={()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                  <FontAwesome5 name="info-circle" size={24} color="#636363" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          
        </View>
      );
    } else {
      return <Text>Unexpected number of workouts</Text>;
    }
  };
  
     

export const WorkoutComponent = ({ workouts }: { workouts: any[] })=>{

  return (
   
        <SafeAreaView style={styles.mainContainer}>
            <Workout workout={workouts}/>
            <WeekWorkoutTracker/>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    mainContainer:{
      flex:1,
      alignItems:'center',
      flexDirection:'column',
    },
    container: {
      flexDirection: 'row',
      gap:15,
    },
    hContainer_plus:{
        alignSelf:'center',
        marginTop:100,
      },
    container2: {
      flexDirection: 'row',
      marginRight:width/2,
      },
    stats_container: {
        flexDirection: 'row',
        marginTop:15,
        marginLeft:10
      },
    wBox:{
      width:width*0.45,
      height:255,
      marginTop:5,
      padding:10,
      position:'static',
      alignSelf:'flex-start',
      backgroundColor:'#202020',
      borderCurve:'continuous',
      borderRadius:20,
      alignItems:'flex-start',
    },
    wBox2:{
      width:width*0.45,
      height:255,
      marginTop:5,
      padding:10,
      marginRight:55,
      position:'static',
      alignSelf:'flex-start',
      backgroundColor:'#202020',
      borderCurve:'continuous',
      borderRadius:20,
      alignItems:'flex-start',
      },
      gradientBorder: {
        borderRadius: 5, // Adjust for the image size + border width
        padding: 5, // Optional: adds padding around the image to show the gradient border
      },
    subcontainer:{
      flex:0
    },
    infoContainer2:{
      alignSelf:'flex-end',
      position:'absolute',
      marginLeft:148,
      paddingBottom:5,
    },
    pContainer_plus:{
      alignSelf:'center',
      marginTop:100,
    },
    infoContainer:{
      alignSelf:'flex-end',
      position:'absolute',
      marginTop:225,
      paddingRight:5,
    },
    checkbox: {
      marginLeft: 10, // Add spacing between text and checkbox
      borderRadius: 5,
      padding:10,
    },
  });
