import { StyleSheet, View, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { Link, Redirect } from 'expo-router';
import { Avatar } from 'react-native-paper';
import MainComponent from '../../components/MainComponent';
import { LinearGradient } from 'expo-linear-gradient'
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { useAuth } from '@/src/providers/AuthProvider';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { session } = useAuth();
  if (!session) {
    return <Redirect href="/(auth)/signIn" />
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.containerText}>
          <ThemedText type="title" style={styles.boxOne}>Make 10k/month</ThemedText>
          <ThemedText type="title" style={styles.boxTwo}>with app</ThemedText>
        </View>
        <View style={styles.userInfoSection}>
            <Link href={'/profiles'} asChild>
              <TouchableOpacity onPress={ () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
              <LinearGradient
                colors={["#FF3131", "#FF9F31"]} // Gradient colors
                start={{ x: 0, y: 0 }} // Adjust gradient direction (top-left to bottom-right)
                end={{ x: 1, y: 1 }}   // Adjust gradient direction (top-left to bottom-right)
                style={styles.gradientBorder} // Apply gradient to the border
              >
                <Avatar.Image size={width * 0.15} source={require('../../assets/images/profileImg.png')} />
                </LinearGradient>
              </TouchableOpacity>
            </Link>
        </View>
      </View>
      <View style={styles.container}>
        <MainComponent />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingTop: 10,
    marginTop:10,
  },
  containerText: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  boxOne: {
    alignSelf: 'center',
    fontSize:26,
  },
  boxTwo: {
    marginTop: -15,
    alignItems: 'center',
    textAlign: 'center',
    fontSize:26,

  },
  boxThree: {
    marginTop: 0,
    alignItems: 'center',
    textAlign: 'center',
  },
  userInfoSection: {
    marginRight: 20,
    alignSelf: 'auto',
    // No borderColor here, will be handled by the gradient now
  },
  gradientBorder: {
    borderRadius: 63, // Adjust for the image size + border width
    padding: 3, // Optional: adds padding around the image to show the gradient border
  },
});