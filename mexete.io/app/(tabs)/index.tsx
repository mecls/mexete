import {StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import ProfileIcon from '@/components/ProfileIcon';

export default function HomeScreen() {
  return (
    <View style={styles.mainContainer} >
      <View style={styles.topContainer}>
        <ThemedText type="title" style={styles.goalAlign}>Finish Marathon</ThemedText>
        <ThemedText type="title" style={styles.goalAlign_}>Sub 3h</ThemedText>
        <ProfileIcon/>
     </View>
      </View>
  );
}

const styles = StyleSheet.create({
  mainContainer:{
    position:'relative',
    flexDirection:'column',
    marginBlockStart:80,
  },
  topContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,    
  },
  centerContainer: {
    gap: 8,
    marginBottom: 8,
  },
  downContainer: {
    gap: 8,
    marginBottom: 8,
  },
  goalAlign:{
    alignItems:'center',
    textAlign:'center',
    margin:5,
  },
  goalAlign_:{
    marginTop:-10,
    alignItems:'center',
    textAlign:'center',
  },
  profileStyle:{
    alignItems:'flex-end',
    textAlign:'right',
  },
});
