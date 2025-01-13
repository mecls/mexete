import { Alert, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { ThemedText } from './ThemedText';
import { Avatar } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { supabase } from '@/lib/supabase';
import useStreak from '../hooks/useStreak';

const { width } = Dimensions.get('screen');

const StreakComponent = () => {
  const { streak, refreshStreak } = useStreak();
  useEffect(() => {
    // Set up real-time subscription
    const subscription = supabase
      .channel('streak_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'streak', // Ensure this matches your actual table name
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          refreshStreak(); // Refresh streak on any update event
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [refreshStreak]);



  return (
    <View>
      <ThemedText type="subtitle">Streak</ThemedText>
      <View style={styles.sBox}>
        <View style={styles.containerStrk}>
          <Avatar.Image
            size={40}
            style={{ backgroundColor: 'transparent' }}
            source={require('../assets/images/solar_fire-bold.png')}
          />
          <ThemedText type="streakTitle">{streak}</ThemedText>
        </View>
        <Avatar.Image
          size={113}
          style={styles.strkImg}
          source={require('../assets/images/0_20lvl.png')}
        />
        <View style={styles.infoContainer}>
          <TouchableOpacity
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          >
            <FontAwesome5 name="info-circle" size={24} color="#636363" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StreakComponent;

const styles = StyleSheet.create({
  sBox: {
    width: width * 0.4,
    height: 140,
    marginTop: 5,
    padding: 10,
    position: 'static',
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#202020',
    borderCurve: 'continuous',
    borderRadius: 20,
  },
  containerStrk: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -10,
  },
  strkImg: {
    marginTop: -20,
    alignSelf: 'center',
    position: 'fixed',
    borderCurve: 'continuous',
    backgroundColor: 'transparent',
  },
  infoContainer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    marginTop: 110,
    paddingRight: 5,
  },
});
