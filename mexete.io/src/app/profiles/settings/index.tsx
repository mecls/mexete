import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedText } from '../../../components/ThemedText'
import { LinearGradient } from 'expo-linear-gradient'
import { Avatar } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons';
import SettingsComponent from '../../../components/SettingsComponent'
import { supabase } from '../../../../lib/supabase'
import { useAuth } from '@/src/providers/AuthProvider';
import { Redirect } from 'expo-router'

const { width } = Dimensions.get('screen');

const settings = () => {
  const { session } = useAuth();
  if (!session) {
    return <Redirect href="/(auth)/signIn" />
  }

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
          <ThemedText style={styles.fullName} type="defaultSemiBold">Miguel Carvalhal</ThemedText>
          <ThemedText style={styles.username} type="default">@mecls</ThemedText>
        </View>
      </View>
      <SettingsComponent />
      <View style={styles.logout}>
        <TouchableOpacity style={{ flexDirection: 'row', gap: 2 }} onPress={() => supabase.auth.signOut()}>
          <Ionicons name="log-out" size={24} color="red" />
          <ThemedText style={styles.logoutText} type="defaultSemiBold">Log out</ThemedText>
        </TouchableOpacity>
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
    marginBottom: 0,
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
