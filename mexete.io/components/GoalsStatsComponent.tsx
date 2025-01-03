import { Dimensions, StyleSheet, TouchableOpacity, View, Image } from 'react-native' // add Image import
import React from 'react'
import { ThemedText } from './ThemedText'
import { Avatar } from 'react-native-paper'
import { FontAwesome5 } from '@expo/vector-icons'
import profile from '@/assets/data/profile'
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('screen');

const StreakComponent = () => {
    const user = profile[0];
    const goals = user.goals;
    return (
        <View>
            <ThemedText type='subtitle'>Goals</ThemedText>
            <View style={styles.sBox}>
                <Image source={require('../assets/images/GoalsStats.png')} style={styles.goalsStatsImg}/>
            </View>
        </View>
    )
}

export default StreakComponent

const styles = StyleSheet.create({
    sBox: {
        width: width * 0.40,
        height: 140,
        marginTop: 5,
        padding: 10,
        position: 'static',
        alignSelf: 'center',  // Changed from 'flex-end' to 'center'
        alignItems: 'center',
        justifyContent: 'center', // Added to center content vertically
        backgroundColor: '#202020',
        borderCurve: 'continuous',
        borderRadius: 20,
    },
    goalsStatsImg: {
        alignSelf: 'center',
        margin:5,
        width: 105, // need to explicitly set width
        height: 105, // need to explicitly set height
        backgroundColor: 'transparent',
    },
    infoContainer: {
        alignSelf: 'flex-end',
        position: 'absolute',
        marginTop: 110,
        paddingRight: 5,
    },
})