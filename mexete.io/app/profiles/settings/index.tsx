import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { LinearGradient } from 'expo-linear-gradient'
import { Avatar } from 'react-native-paper'
import profile from '@/assets/data/profile'

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
    color: '#666',
    fontWeight: 'bold',
  },
  fullName: {
    fontSize: 24,
  },
  gradientBorder: {
    borderRadius: 63, // Adjust for the image size + border width
    padding: 3, // Optional: adds padding around the image to show the gradient border
  },
  nameContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: 30,
  },
})
