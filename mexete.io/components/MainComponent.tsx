import React from 'react'
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
import { ThemedText } from './ThemedText';
import { Avatar } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import PriorityList from '@/components/PriorityList';
import tasks from '@/assets/data/tasks';
import { MainWorkoutComponent } from './MainWorkoutComponent';
import workouts from '@/assets/data/workouts';
import StreakComponent from './StreakComponent';

const { width } = Dimensions.get('window');




export default function MainComponent() {
  const strkDays= "89";

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.subcontainer}>
            <ThemedText type='subtitle'>Priorities</ThemedText>
            <View style={styles.pBox}>
            <PriorityList tasks={tasks} />
            </View>
        </View>
        <View style={styles.subcontainer2}>
            <StreakComponent />
            <View style={styles.hBox}>
            <View style={styles.hContainer_plus}>
               <MainWorkoutComponent workouts={workouts}/>
            </View>
        </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.subcontainer3}>
              <ThemedText type='subtitle'>Monthly Stats</ThemedText>
              <View style={styles.mBox}>
                <ThemedText type='default'>After you start using the app this will update automaticly.</ThemedText>
                <View style={styles.m_infoContainer}>
                <TouchableOpacity>
                <FontAwesome5 name="info-circle" size={24} color="#636363" />
                </TouchableOpacity>
                </View>
              </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    mainContainer:{
      flex:1,
      padding:10,
      margin:10,
      marginTop:20,
      alignItems:'center',
      flexDirection:'column',
    },
    container: {
      flexDirection: 'row',
      justifyContent:'space-between',
      gap: 20, 
      paddingTop:15,
    },
    pBox:{
      width:width*0.5,
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
    sBox:{
      width:width*0.40,
      height:140,
      marginTop:5,
      padding:10,
      position:'static',
      alignSelf:'flex-end',
      alignItems:'center',
      backgroundColor:'#202020',
      borderCurve:'continuous',
      borderRadius:20,
    },
    containerStrk: {
      flexDirection: 'row',
      alignItems:'center',
      marginTop:-10,
    },
    hBox:{
      width:width*0.40,
      height:100,
      marginTop:10,
      alignSelf:'flex-end',
      position:'static',
      backgroundColor:'#202020',
      borderCurve:'continuous',
      borderRadius:20,
    },
    mBox:{
      width:width*0.95,
      height:200,
      marginTop:5,
      padding:10,
      marginRight:5,
      position:'static',
      alignSelf:'flex-start',
      backgroundColor:'#202020',
      borderCurve:'continuous',
      borderRadius:20,
    },
    subcontainer:{
      flex:4
    },
    subcontainer2:{
      flex:3,
      alignSelf:'flex-end',
    },
    subcontainer3:{
      flex:1,
    },
    strkImg:{
      marginTop:-20,
      alignSelf:'center',
      position:'fixed',
      borderCurve: 'continuous',
      backgroundColor:'transparent',
    },
    b_transparent:{
      backgroundColor:'transparent',
    },
    infoContainer:{
      alignSelf:'flex-end',
      position:'absolute',
      marginTop:110,
      paddingRight:5,
    },
    pContainer_plus:{
      alignSelf:'center',
      marginTop:100,
    },
    hContainer_plus:{
      alignSelf:'center',
      marginTop:10,
    },
    m_infoContainer:{
      alignSelf:'flex-end',
      position:'absolute',
      marginTop:170,
      paddingRight:5,
    },
  });
