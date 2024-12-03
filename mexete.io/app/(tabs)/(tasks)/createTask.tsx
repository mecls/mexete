import { StyleSheet, SafeAreaView, View, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { StatusBar } from 'expo-status-bar';


export default function CreateTask() {

  return (
   <SafeAreaView>
    <View>
      <ThemedText>Modal screen</ThemedText>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
