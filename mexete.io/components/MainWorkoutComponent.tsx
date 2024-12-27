import React, { useState } from 'react'
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import { ThemedText } from './ThemedText';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Checkbox from 'expo-checkbox';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');


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
          <View style={styles.subcontainer}>
            <Text>Workout</Text>
            <View style={styles.wBox2}>
              <View style={styles.pContainer_plus}>
              <TouchableOpacity onPress={()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                <AntDesign name="pluscircleo" size={24} color="#636363" />
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    } else if (workout.length === 1) {
      return (
        <View style={styles.container2}>
          {workout[0].title === "Run"?(
              <View key={workout[0].id} >
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <ThemedText type='title'>{workout[0].title || 'No title available'}</ThemedText>
                    <Checkbox style={styles.checkbox} value={workoutChecks[workout[0].id]} onValueChange={() => toggleSubtask(workout[0].id)}/>
                    {/* <ThemedText style={{alignSelf:'center', marginLeft:10}} type='defaultSemiBold'>[{workout[0].description.totalTime || 'No title available'}min]</ThemedText> */}
                </View>
                <View style={{flexDirection:'row', alignItems:'baseline', gap:5, marginTop:5}}>
                    <LinearGradient colors={["#FF3131", "#FF9F31"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradientBorder}> 
                    {/* To change the size of the whole box around the arrow just change this size */}
                     <FontAwesome name="arrow-right" size={12} color="white" /> 
                    </LinearGradient>                  
                    <ThemedText type='defaultSemiBold'>{workout[0].description.title || 'No title available'}</ThemedText>
                </View>
              </View>
          ):(
            <View key={workout[0].id} >
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <ThemedText type='title'>{workout[0].title || 'No title available'}</ThemedText>
                 <Checkbox style={styles.checkbox} value={workoutChecks[workout[0].id]} onValueChange={() => toggleSubtask(workout[0].id)}/>
                 {/* <ThemedText style={{alignSelf:'center', marginLeft:10}} type='defaultSemiBold'>[{workout[0].description.totalTime || 'No title available'}min]</ThemedText> */}
            </View>
            <ThemedText type='defaultSemiBold'>{workout[0].description.title || 'No title available'}</ThemedText>
            </View>
          )}
            <View> 
                <View style={styles.infoContainer2}>
                    <TouchableOpacity onPress={()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                    <FontAwesome5 name="info-circle" size={24} color="#636363" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        
      );
    } else if (workout.length >= 2) {
      return (
        <View style={styles.container}>
          {/* Gets the workoutItem (Its a workout) from the workout table  */}
          {workout.map((workoutItem) => (
            <View key={workoutItem.id} style={styles.container3} >
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <ThemedText type='title'>{workoutItem.title || 'No title available'}</ThemedText>
                  <Checkbox style={styles.checkbox} value={workoutChecks[workoutItem.id]} onValueChange={() => toggleSubtask(workoutItem.id)}/>
              </View>
              <View style={{flexDirection:'row', alignItems:'baseline', gap:5, marginTop:5}}>
                    <LinearGradient colors={["#FF3131", "#FF9F31"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradientBorder}> 
                    {/* To change the size of the whole box around the arrow just change this size */}
                     <FontAwesome name="arrow-right" size={12} color="white" /> 
                    </LinearGradient>     
                    <ThemedText type='defaultSemiBold'>{workoutItem.description.title || 'No title available'}</ThemedText>
                </View>               
                 <View style={styles.m_infoContainer}>
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
  
     

export const MainWorkoutComponent = ({ workouts }: { workouts: any[] })=>{

  return (
   
        <SafeAreaView >
            <ScrollView horizontal alwaysBounceHorizontal automaticallyAdjustContentInsets>
                <Workout workout={workouts}/>
            </ScrollView>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    mainContainer:{
    },
    container: {
      flexDirection: 'row',
      marginLeft:10,
      alignItems:'flex-start',
      position:'relative',
      columnGap:70,
      justifyContent: 'space-between', // Spread items
    },
    hContainer_plus:{
    },
    container2: {
      flexDirection: 'row',
      alignSelf:'flex-start',
      marginRight:60,
    },
    container3: {
      flexDirection: 'column',
    },
    wBox:{
    },
    gradientBorder: {
        borderRadius: 3, // Adjust for the image size + border width
        padding: 3, // Optional: adds padding around the image to show the gradient border
      },
    wBox2:{
        width:width*0.4,
        marginLeft:10,
        height:255,
      },
    subcontainer:{
      flex:4
    },
    infoContainer2:{
        alignSelf:'flex-start',
        position:'absolute',
        marginTop:60,
        marginLeft:40,
    },
    pContainer_plus:{
      alignSelf:'center',
      marginTop:100,
    },
    m_infoContainer:{
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
