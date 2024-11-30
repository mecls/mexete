import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ThemedText } from './ThemedText';
export default function Box_p() {
  return (
    <View style={styles.mainContainer}>
        <ThemedText type='subtitle'>Priorities</ThemedText>
        <View style={styles.pBox}>
        <ThemedText type='default'>Plan App</ThemedText>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer:{
      position:'absolute',
      flexDirection:'column',      
    },
    pBox:{
        flex:1/3,
        backgroundColor:'#202020',
    },
  });
