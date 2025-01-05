import { StyleSheet, SafeAreaView, View, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Avatar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import profile from '@/assets/data/profile';
import StreakComponent from '@/components/StreakComponent';
import GoalsStatsComponent from '@/components/GoalsStatsComponent';
import DailyStreakCalComponent from '@/components/DailyStreakCalComponent';
import { supabase } from '@/lib/supabase';

const { width } = Dimensions.get('screen');
// Add this import at the top

export default function ProfileScreen() {
  // Get the first (and only) user from the profile array
  const user = profile[0];
  const streak = user.streak;

  return (
    <SafeAreaView style={styles.mainContainer}>
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
                size={width * 0.25}
                source={require('../../assets/images/profileImg.png')}
              />
            </LinearGradient>
          </View>
          <ThemedText style={styles.fullName} type="title">{user.fullName}</ThemedText>
          <ThemedText style={styles.username} type="defaultSemiBold">@{user.username}</ThemedText>
        </View>
        <View style={styles.streakContainer}>
          <GoalsStatsComponent />
          <StreakComponent />
        </View>
        <DailyStreakCalComponent />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  container: {
    flex: 1
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#e0e0e0',
  },
  username: {
    fontSize: 16,
    marginBottom: 5,
    color: '#B5B5B5',
    fontWeight: 'bold',
  },
  fullName: {
    fontSize: 24,
  },
  gradientBorder: {
    borderRadius: 63, // Adjust for the image size + border width
    padding: 3, // Optional: adds padding around the image to show the gradient border
  },
  streakContainer: {
    alignSelf: 'center',
    position: 'absolute',
    paddingRight: 5,
    marginTop: 220,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'center',
  },
});
