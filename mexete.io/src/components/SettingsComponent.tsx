import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons'
import { ThemedText } from './ThemedText'
import { Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons'

const SettingsComponent = () => {
  return (
    <View style={styles.settings}>
    <View style={styles.settingsContainer}>
      <ThemedText style={{ marginBottom: 5, alignSelf: 'flex-start', marginLeft: 5 }} type="defaultSemiBold">Settings</ThemedText>
      <View style={styles.settingsBox}>
        <View style={styles.settingsItem}>
          <Ionicons name="notifications" size={30} color="white" />
          <ThemedText style={{ fontSize: 16 }} type="defaultSemiBold">Notifications</ThemedText>
          <MaterialIcons style={{ marginLeft: 120 }} name="arrow-forward-ios" size={20} color="white" />
        </View>
      </View>
      <View style={[styles.settingsBox, { marginTop: 10 }]}>
        <View style={styles.settingsItem}>
          <Fontisto name="locked" size={28} style={{ marginLeft: 5 }} color="white" />
          <ThemedText style={{ fontSize: 16 }} type="defaultSemiBold">Privacy</ThemedText>
          <MaterialIcons style={{ marginLeft: 160 }} name="arrow-forward-ios" size={20} color="white" />
        </View>
      </View>
    </View>
      <View style={styles.settingsContainer2}>
        <ThemedText style={{ marginBottom: 5, alignSelf: 'flex-start', marginLeft: 0 }} type="defaultSemiBold">About</ThemedText>
        <View style={styles.settingsBox}>
          <View style={styles.settingsItem}>
            <Entypo name="share" size={30} color="white" />
            <ThemedText style={{ fontSize: 16 }} type="defaultSemiBold">Share mexete.io</ThemedText>
            <MaterialIcons style={{ marginLeft: 90 }} name="arrow-forward-ios" size={20} color="white" />
          </View>
        </View>
        <View style={[styles.settingsBox, { marginTop: 10 }]}>
          <View style={styles.settingsItem}>
            <AntDesign name="star" size={30} color="white" />
            <ThemedText style={{ fontSize: 16 }} type="defaultSemiBold">Rate mexete.io</ThemedText>
            <MaterialIcons style={{ marginLeft: 100 }} name="arrow-forward-ios" size={20} color="white" />
          </View>
        </View>
        <View style={[styles.settingsBox, { marginTop: 10 }]}>
          <View style={styles.settingsItem}>
            <Entypo name="help-with-circle" size={30} color="white" />
            <ThemedText style={{ fontSize: 16 }} type="defaultSemiBold">Help</ThemedText>
            <MaterialIcons style={{ marginLeft: 180 }} name="arrow-forward-ios" size={20} color="white" />
          </View>
        </View>
        <View style={[styles.settingsBox, { marginTop: 10 }]}>
          <View style={styles.settingsItem}>
            <FontAwesome5 name="info-circle" size={30} color="white" />
            <ThemedText style={{ fontSize: 16 }} type="defaultSemiBold">About</ThemedText>
            <MaterialIcons style={{ marginLeft: 170 }} name="arrow-forward-ios" size={20} color="white" />
          </View>
        </View>
      </View>
    </View>
  )
}

export default SettingsComponent

const styles = StyleSheet.create({
    settings: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
        alignSelf: 'center',
        marginTop: -20,
      },
      settingsContainer: {
        width: '90%',
        alignItems: 'center',
        padding: 15,
        alignSelf: 'center',
        marginTop: 20,
      },
      settingsContainer2: {
        width: '90%',
        alignItems: 'center',
        padding: 15,
        alignSelf: 'center',
        marginTop: -20,

      },
      settingsBox: {
        width: '95%',
        height: 50,
        backgroundColor: '#363636', // or your desired background color
        borderRadius: 8,
        padding: 10,
        
      },
      settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      },
})