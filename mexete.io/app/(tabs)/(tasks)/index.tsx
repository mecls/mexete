import { StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Link} from 'expo-router';
import * as Haptics from 'expo-haptics';
import AntDesign from '@expo/vector-icons/AntDesign';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

const DATA = [
  {
    id: '1',
    title: 'Exercicios AR',
    subtask1: 'O que é DNS?',
    priority_lvl:'1',
    timeToFinish_subtask1:'1h',
    isDone1:true,
    subtask2: 'Servidor A e R',
    timeToFinish_subtask2:'45min',
    isDone2:true,
    subtask3: 'Exercicios 1,2',
    timeToFinish_subtask3:'45min',
    isDone3:true,
    percentage:'',
  },
  {
    id: '2',
    title: 'Plan App',
    priority_lvl:'2',
    subtask1: 'O que é DNS?',
  },
  {
    id: '3',
    title: 'Run',
    priority_lvl:'3',
  },
  {
    id: '4',
    title: 'Trash Out',
  },
];

type ItemProps = {title: string, percentage:string | undefined, subtask1:string | undefined,subtask2:string | undefined,subtask3:string | undefined,priority_lvl:string | undefined};

const Item = ({ title, percentage, subtask1, subtask2, subtask3, priority_lvl }: ItemProps) => {

  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [completedPercentage, setCompletedPercentage] = useState(percentage || "0%");

  const getPriorityColor = (level: string | undefined) => {
    switch (level) {
      case '1':
        return '#FF3131'; // High priority - Red
      case '2':
        return '#FF9F31'; // Medium priority - Orange
      case '3':
        return '#31FF5E'; // Low priority - Green
      default:
        return '#636363'; // Default color - Grey
    }
  };
 
  // FIX THE LOGIC
  // If completedSubtasks = 0 the first check doesnt work properly
  // The uncheck math also is bugged, it doesnt work properly
  const updatePercentage = () => {
    let totalSubtasks = 0;
    let completedSubtasks = 1;

    if (subtask1) {
      totalSubtasks += 1;
      if (isChecked1) completedSubtasks += 1;
    }
    if (subtask2) {
      totalSubtasks += 1;
      if (isChecked2) completedSubtasks += 1;
    }
    if (subtask3) {
      totalSubtasks += 1;
      if (isChecked3) completedSubtasks += 1;
    }

    const percentage = totalSubtasks > 0 
      ? `${Math.round((completedSubtasks / totalSubtasks) * 100)}%` 
      : "0%";

    setCompletedPercentage(percentage);
  };

  return (
    <View
      style={[
        styles.fl_subContainer,
        { borderTopColor: getPriorityColor(priority_lvl) },
      ]}
    >
      <View style={styles.fl_subContainerTop}>
        <ThemedText type="subtitle">{title}</ThemedText>
        {subtask1 && <ThemedText type="title">{completedPercentage}</ThemedText>}
      </View>
      <View style={styles.fl_subContainerBody}>
        {subtask1 && (
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <ThemedText type="defaultSemiBold">{subtask1}</ThemedText>
            <Checkbox
              style={styles.checkbox}
              value={isChecked1}
              onValueChange={(newValue) => {
                setChecked1(newValue);
                updatePercentage();
              }}
            />
          </View>
        )}
        {subtask2 && (
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <ThemedText type="defaultSemiBold">{subtask2}</ThemedText>
            <Checkbox
              style={styles.checkbox}
              value={isChecked2}
              onValueChange={(newValue) => {
                setChecked2(newValue);
                updatePercentage();
              }}
            />
          </View>
        )}
        {subtask3 && (
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <ThemedText type="defaultSemiBold">{subtask3}</ThemedText>
            <Checkbox
              style={styles.checkbox}
              value={isChecked3}
              onValueChange={(newValue) => {
                setChecked3(newValue);
                updatePercentage();
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default function TasksScreen() {

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container} >
        <ThemedText style={{alignSelf:'center', paddingTop:5}} type="title">Today</ThemedText>
        <View style={styles.flContainer}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              percentage={item.percentage}
              subtask1={item.subtask1}
              subtask2={item.subtask2}
              subtask3={item.subtask3}
              priority_lvl={item.priority_lvl} // Pass the priority level
            />
          )}
          keyExtractor={(item) => item.id}
        />
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
  fl_subContainer:{
    margin:10,
    paddingTop:3,
    paddingLeft:12,
    backgroundColor:'#202020',
    borderTopColor:'#FF3131',
    borderTopWidth:10,
    borderRadius:20,
    width:width*0.9,
    height:125,
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
  fl_subContainerTop:{
    flexDirection: 'row',
    alignItems:'baseline',
    gap:width*0.35,
  },
  fl_subContainerBody:{
    flexDirection: 'column',
    alignItems:'flex-start',
    
  },
  checkbox:{
    alignSelf:'center',
    borderRadius:5,
  },
});
