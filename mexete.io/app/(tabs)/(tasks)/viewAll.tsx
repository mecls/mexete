import { StyleSheet, SafeAreaView, View, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import ViewAllComponent from '@/components/ViewAllTasks';
import tasks from '@/assets/data/tasks';

const { width } = Dimensions.get('window');

export default function ViewAllTasks() {
  return (
   <SafeAreaView style={styles.mainContainer}>
   <View>
        <View style={styles.con_calender}>
          <View style={styles.calender_layout}>
            <ThemedText style={{color:'#000'}}>Calendar</ThemedText>
          </View>
      </View>
      <View style={styles.flatList_con}>
        <ViewAllComponent tasks={tasks}/>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
    alignItems:'center',
    flexDirection:'column',
    position:'fixed'
  },
  con_calender:{
    flex:1/8,
    backgroundColor:'#fff',
    width: width,
    marginTop:20,
    marginBottom:10,
  },
  calender_layout:{
    margin:10,
  },
  flatList_con:{
    flex:0.8,
  }
});
