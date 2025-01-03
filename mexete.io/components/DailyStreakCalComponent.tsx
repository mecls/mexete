import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'

const DailyStreakCalComponent = () => {
    const today = new Date();
    const navigation = useNavigation();

    // Generate last 14 days
    const generateDays = () => {
        const days = [];
        for (let i = 13; i >= 0; i--) {
            const date = new Date(today.getTime() - (i * 24 * 60 * 60 * 1000));
            // Mock data - replace with your actual streak data
            const isActive = [1, 2, 3, 7, 11, 12, 13].includes(14 - i);
            days.push({ day: 14 - i, isActive });
        }
        return days;
    };

    return (
        <View style={styles.dailyStreakContainer}>
            <ThemedText type='subtitle'>Your daily streak</ThemedText>
            <View style={styles.streakCard}>
                <ThemedText type='defaultSemiBold' style={styles.cardTitle}>Last 14 days</ThemedText>
                <View style={styles.daysGrid}>
                    {generateDays().map((day) => (
                        <View key={day.day} style={styles.dayBox}>
                            {day.isActive ? (
                                <LinearGradient
                                    colors={["#FF3131", "#FF9F31"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={[styles.dayBoxInner]}
                                >
                                    <ThemedText style={styles.dayText}>{day.day}</ThemedText>
                                </LinearGradient>
                            ) : (
                                <View style={[styles.dayBoxInner, { borderWidth: 3, borderColor: '#fff' }]}>
                                    <ThemedText style={styles.dayText}>{day.day}</ThemedText>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
                <Link href="/profiles/calendar" asChild>
                <TouchableOpacity style={styles.viewAllButton}>
                    <ThemedText style={styles.buttonText}>View all streaks</ThemedText>
                </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
};

export default DailyStreakCalComponent

const styles = StyleSheet.create({

    dailyStreakContainer: {
        alignSelf: 'flex-end',
        position: 'fixed',
        paddingRight: 5,
        marginTop: 200,
        justifyContent: 'space-evenly',
        width: '100%',
        alignItems: 'flex-start',
    },
    streakCard: {
        backgroundColor: '#202020',
        borderRadius: 12,
        padding: 30,
        width: '85%',
        marginTop: 10,
    },
    cardTitle: {
        fontSize: 16,
        marginBottom: 12,
        marginTop: -20,
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 2,
        width: '100%',
    },
    dayBox: {
        width: '12%',
        aspectRatio: 1,
        marginVertical: 4,
    },
    dayBoxInner: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    viewAllButton: {
        backgroundColor: '#636363',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginTop: 16,
        marginBottom: -15,
    },
    buttonText: {
        fontSize: 14,
    }
});