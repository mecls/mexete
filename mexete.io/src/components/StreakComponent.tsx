import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedText } from './ThemedText'
import { Avatar } from 'react-native-paper'
import { FontAwesome5 } from '@expo/vector-icons'
import profile from '../assets/data/profile'
import * as Haptics from 'expo-haptics';
import { useAuth } from '../providers/AuthProvider'
import { supabase } from '@/lib/supabase'

const { width } = Dimensions.get('screen');

const StreakComponent = () => {

  const [streakData, setStreakData] = useState<any[]>([]);

  useEffect(() => {
    const fetchStreak = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let { data, error } = await supabase.from('streak').select('*').eq('user_id', user.id)
      if (error) {
        Alert.alert('Error fetching tasks');
        return;
      }
      if (data) {
        setStreakData(data);
      }
    };

    fetchStreak();
  }, []);

    const streak = streakData[0]?.count;
    return (
        <View>
            <ThemedText type='subtitle'>Streak</ThemedText>
            <View style={styles.sBox}>
                <View style={styles.containerStrk}>
                    <Avatar.Image size={40} style={{ backgroundColor: 'transparent' }} source={require('../assets/images/solar_fire-bold.png')} />
                    <ThemedText type='streakTitle'>{streak}</ThemedText>
                </View>
                <Avatar.Image size={113} style={styles.strkImg} source={require('../assets/images/0_20lvl.png')} />
                <View style={styles.infoContainer}>
                    <TouchableOpacity onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                        <FontAwesome5 name="info-circle" size={24} color="#636363" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default StreakComponent

const styles = StyleSheet.create({
    sBox:{
        width:width*0.40,
        height:140,
        marginTop:5,
        padding:10,
        position:'static',
        alignSelf:'flex-end',
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
      strkImg:{
        marginTop:-20,
        alignSelf:'center',
        position:'fixed',
        borderCurve: 'continuous',
        backgroundColor:'transparent',
      },
      infoContainer:{
        alignSelf:'flex-end',
        position:'absolute',
        marginTop:110,
        paddingRight:5,
      },
})