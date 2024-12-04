import { StyleSheet, SafeAreaView, View, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { StatusBar } from 'expo-status-bar';


export default function CreateTask() {

  return (
   <SafeAreaView style={styles.mainContainer}>
    <View style={styles.container}>
      <ThemedText>Modal screen</ThemedText>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
    padding:10,
    margin:10,
    alignItems:'flex-start',
    flexDirection:'column',
  },
  container: {
    flexDirection: 'column',
    gap: 20, 
    paddingTop:15,
  },
});
