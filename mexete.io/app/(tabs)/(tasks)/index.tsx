import { StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Link} from 'expo-router';
import * as Haptics from 'expo-haptics';
import AntDesign from '@expo/vector-icons/AntDesign';
import tasks from '@/assets/data/tasks';
import TaskList from '@/components/TaskList';

const { width } = Dimensions.get('window');

export default function TasksScreen() {

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container} >
        <ThemedText style={{alignSelf:'center', paddingTop:5}} type="title">Today</ThemedText>
        <View style={styles.flContainer}>
        <TaskList tasks={tasks} />
        </View>
        <View style={styles.footer}>
          <View style={styles.all_box} >
              <TouchableOpacity  >
                <Link href={'/viewAll'} onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                  <ThemedText type='defaultSemiBold'>View All</ThemedText>
                </Link>
              </TouchableOpacity>
            </View>
              <TouchableOpacity style={styles.plus_box}>
             <Link href={'/createTask'} onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
              <AntDesign name="pluscircleo" size={55} color="white" />
             </Link>
             </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
    padding:10,
    margin:10,
    alignItems:'center',
    flexDirection:'column',
  },
  container: {
    flex:1,
    flexDirection: 'column',
    gap: 20, 
    paddingTop:15,
  },
  flContainer: {
    flex:8,
  },
  footer:{
    flex:2,
    marginBottom:25,
    marginTop:-30,
    padding:20,
    flexDirection: 'row',
    alignItems:'center',
    gap:width*0.4,
  },
  all_box:{
    backgroundColor:'#636363',
    borderRadius:10,
    width:width*0.25,
    height:45,
    fontWeight:'300',
    alignItems:'center',
    padding:10,
  },
  plus_box:{
    alignItems:'flex-end',
    padding:10,
  },
});
