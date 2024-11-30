import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { ThemedText } from './ThemedText';
import { Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileIcon() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.userInfoSection}>
        <View>
        <Avatar.Image size={52} source={require('../assets/images/profileImg.png')} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    mainContainer:{
      position:'absolute',
      flexDirection:'row',  
      flex:1,    
    },
    userInfoSection:{
      paddingHorizontal:30,
      marginBottom:25,
    }
  });
