import React from 'react'
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
import { ThemedText } from './ThemedText';
import { Avatar } from 'react-native-paper';
import {Link, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const { width } = Dimensions.get('window');

export default function MainComponent() {
  const strkDays= "89";


  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.subcontainer}>
            <ThemedText type='subtitle'>Priorities</ThemedText>
            <View style={styles.pBox}>
              <View style={styles.pContainer_plus} >
                  <TouchableOpacity  >
                    <Link href={'/(tabs)/(tasks)'} onPress={()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                      <AntDesign name="pluscircleo" size={30} color="#636363" />
                    </Link>
                  </TouchableOpacity>
              </View>
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
            <View style={styles.infoContainer}>
                <TouchableOpacity onPress={()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                   <FontAwesome5 name="info-circle" size={24} color="#636363" />
                </TouchableOpacity>
            </View>
            </View>
            <View style={styles.subcontainer2}>
            <View style={styles.hBox}>
            <ThemedText type='defaultSemiBold'>Hobbies:</ThemedText>
            <View style={styles.hContainer_plus}>
                  <TouchableOpacity>
                  <AntDesign name="pluscircleo" size={24} color="#636363" />
                  </TouchableOpacity>
              </View>
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
      width:200,
      height:255,
      marginTop:5,
      padding:10,
      position:'static',
      alignSelf:'flex-start',
      backgroundColor:'#202020',
      borderCurve:'continuous',
      borderRadius:20,
    },
    sBox:{
      width:width*0.385,
      height:150,
      marginTop:5,
      padding:10,
      position:'static',
      alignSelf:'flex-start',
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
      width:width*0.385,
      height:100,
      marginTop:5,
      marginRight:5,
      padding:10,
      alignSelf:'flex-start',
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
    b_transparent:{
      backgroundColor:'transparent',
    },
    infoContainer:{
      alignSelf:'flex-end',
      position:'absolute',
      marginTop:120,
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
