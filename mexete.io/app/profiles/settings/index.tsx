import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { LinearGradient } from 'expo-linear-gradient'
import { Avatar } from 'react-native-paper'
import profile from '@/assets/data/profile'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import SettingsComponent from '@/components/SettingsComponent'

const { width } = Dimensions.get('screen');

const settings = () => {
  const user = profile[0];

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={["#FF3131", "#FF9F31"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBorder}
          >
            <Avatar.Image
              size={width * 0.15}
              source={require('../../../assets/images/profileImg.png')}
            />
          </LinearGradient>
        </View>
        <View style={styles.nameContainer}>
          <ThemedText style={styles.fullName} type="defaultSemiBold">{user.fullName}</ThemedText>
          <ThemedText style={styles.username} type="default">@{user.username}</ThemedText>
        </View>
      </View>
      <SettingsComponent />
      <View style={styles.logout}>
        <Ionicons name="log-out" size={24} color="red" />
        <ThemedText style={styles.logoutText} type="defaultSemiBold">Log out</ThemedText>
      </View>
      <ThemedText style={styles.version}>Version 1.0.0</ThemedText>
    </View>
  )
}

export default settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  profileContainer: {
    width: '80%',
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#363636',
    borderRadius: 10,
    marginTop: 20,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 60,
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 55,
    backgroundColor: '#e0e0e0',
  },
  username: {
    fontSize: 14,
    marginBottom: 5,
    color: '#E8E8E8',
    fontWeight: 'bold',
  },
  nameContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: 30,
  },
  fullName: {
    fontSize: 24,
  },
  gradientBorder: {
    borderRadius: 63, // Adjust for the image size + border width
    padding: 3, // Optional: adds padding around the image to show the gradient border
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom:0,
    backgroundColor: '#363636',
    width: '70%',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
  },
  version: {
    color: '#E8E8E8',
    marginBottom: 60,
    fontSize: 12,
  },
})
