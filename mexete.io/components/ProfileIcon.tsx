import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { ThemedText } from './ThemedText';
import { Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileIcon() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.userInfoSection}>
          <Avatar.Image size={60} source={require('../assets/images/profileImg.png')} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    flexDirection: 'row',
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  userInfoSection: {
    paddingHorizontal: -10,
    marginBottom: 25,
    marginLeft: 295,
    marginTop: -50,
    borderWidth: 3,
    borderColor: '#FF3131',
    borderRadius: 63, // Adjust for the image size + border width
    borderCurve: 'circular',
  }
});
