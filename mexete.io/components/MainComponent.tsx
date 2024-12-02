import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { ThemedText } from './ThemedText';
import { Avatar } from 'react-native-paper';
export default function MainComponent() {

  const strkDays= "89";

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.subcontainer}>
            <ThemedText type='subtitle'>Priorities</ThemedText>
            <View style={styles.pBox}>
            </View>
        </View>
        <View style={styles.subcontainer2}>
            <ThemedText type='subtitle'>Streak</ThemedText>
            <View style={styles.sBox}>
              <View style={styles.containerStrk}>
              <Avatar.Image size={40} style={{backgroundColor:'transparent'}} source={require('../assets/images/solar_fire-bold.png')} />
              <ThemedText type='streakTitle'>{strkDays}</ThemedText>
              </View>
            <Avatar.Image size={113} style={styles.strkImg} source={require('../assets/images/0_20lvl.png')} />
            </View>
            <View style={styles.subcontainer2}>
            <View style={styles.hBox}>
            <ThemedText type='defaultSemiBold'>Hobbies:</ThemedText>
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
      alignItems:'center',
      flexDirection:'column',
    },
    container: {
      flexDirection: 'row',
      justifyContent:'space-between',
      gap: 20, 
      paddingTop:10,
    },
    pBox:{
      width:200,
      height:255,
      marginTop:5,
      padding:10,
      position:'static',
      backgroundColor:'#202020',
      borderCurve:'continuous',
      borderRadius:20,
    },
    sBox:{
      width:150,
      height:150,
      marginTop:5,
      padding:10,
      position:'static',
      alignItems:'center',
      backgroundColor:'#202020',
      borderCurve:'continuous',
      borderRadius:20,
    },
    containerStrk: {
      flexDirection: 'row',
      alignItems:'center',
    },
    hBox:{
      width:150,
      height:100,
      marginTop:5,
      padding:10,
      position:'static',
      backgroundColor:'#202020',
      borderCurve:'continuous',
      borderRadius:20,
    },
    subcontainer:{
      flex:4
    },
    subcontainer2:{
      flex:3,
    },
    subcontainer3:{
      flex:1,
    },
    strkImg:{
      marginTop:-6,
      alignSelf:'center',
      position:'fixed',
      borderCurve: 'continuous',
      backgroundColor:'transparent',
    },
  });
