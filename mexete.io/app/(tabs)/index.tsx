import {StyleSheet, View, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { Avatar } from 'react-native-paper';
import MainComponent from '@/components/MainComponent';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.mainContainer}>
    <View style={styles.container}>
      <View style={styles.containerText}>
        <ThemedText type="title" style={styles.boxOne}>Make 10k/month</ThemedText>
        <ThemedText type="title" style={styles.boxTwo}>with app</ThemedText>
        <ThemedText type="default" style={styles.boxThree}>Today</ThemedText>
      </View>
      <View style={styles.userInfoSection}>
        <Link href={'/(tabs)/hobbies'} asChild>
          <TouchableOpacity>
              <Avatar.Image size={width * 0.15} source={require('../../assets/images/profileImg.png')} />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
    <View style={styles.container}>
      <MainComponent/>
    </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    alignItems:'flex-end',
    flexDirection:'column',
    backgroundColor:'#131514',
  },
  container: {
    flexDirection: 'row',
    alignItems:'center',
    gap: 20, 
    paddingTop:10,
  },
  containerText: {
    flexDirection: 'column',
    alignItems:'center',
    gap: 8,    
  },
  boxOne:{
    alignSelf:'center',
  },
  boxTwo:{
    marginTop:-15,
    alignItems:'center',
    textAlign:'center',
  },
  boxThree:{
    marginTop:0,
    alignItems:'center',
    textAlign:'center',
    },
  userInfoSection: {
    marginRight:20,
    alignSelf:'baseline',
    borderColor:'#FF3131',
    borderWidth: 3,
    borderRadius: 63, // Adjust for the image size + border width
    borderCurve: 'circular',
  },
});
