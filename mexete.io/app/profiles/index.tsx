import { StyleSheet, SafeAreaView, View, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

const { width } = Dimensions.get('window');

export default function ProfileScreen({ user }: { user?: { username: string; fullName: string } }) {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar} />
          </View>
          <ThemedText style={styles.username} type="title">
            {user?.username || 'Username'}
          </ThemedText>
          <ThemedText style={styles.fullName} type="defaultSemiBold">
            {user?.fullName || 'Full Name'}
          </ThemedText>
        </View>
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
    width: 120,
    height: 120,
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
    fontSize: 24,
    marginBottom: 5,
  },
  fullName: {
    fontSize: 16,
    color: '#666',
  },
});
