import { StyleSheet, SafeAreaView, View, TouchableOpacity, Dimensions, FlatList, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import * as Haptics from 'expo-haptics';
import Checkbox from 'expo-checkbox';
import { useMemo, useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const { width } = Dimensions.get('window');

const getPriorityColor = (level: number | undefined) => {
  switch (level) {
    case 1:
      return '#FF3131'; // High priority - Red
    case 2:
      return '#FF9F31'; // Medium priority - Orange
    case 3:
      return '#31FF5E'; // Low priority - Green
    default:
      return '#636363'; // Default color - Grey
  }
};
const TaskItem = ({task}: { task: any}) => {
  
  const [subtaskChecks, setSubtaskChecks] = useState(
    task.subtasks?.map(() => false) || []
  );
  

  const updatePercentage = () => {
    const totalSubtasks = subtaskChecks.length;
    const completedSubtasks = subtaskChecks.filter((checked: any) => checked).length;
    return totalSubtasks > 0
      ? `${Math.round((completedSubtasks / totalSubtasks) * 100)}%`
      : '0%';
  };

  const completedPercentage = useMemo(()=>updatePercentage(), [updatePercentage()]);

  const toggleSubtask = (index: number) => {
    const updatedChecks = [...subtaskChecks];
    updatedChecks[index] = !updatedChecks[index];
    setSubtaskChecks(updatedChecks);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  };

  return (
     <SafeAreaView style={styles.mainContainer}>
    <View
      style={[
        styles.fl_subContainer,
        { borderTopColor: getPriorityColor(task.priority_level) },
      ]}
    >
      <View style={styles.fl_subContainerTop}>
        <ThemedText type="subtitle" >{task.title}</ThemedText>
        { task.subtasks && <ThemedText type="title" style={styles.percentageText}>{completedPercentage}</ThemedText>}
      </View>
      <View style={styles.fl_subContainerBody}>
        {task.subtasks?.map((subtask: any, index: number) => (
          <View key={subtask.subtask_id} style={{ flexDirection: 'row', gap: 5 }}>
            <ThemedText type="defaultSemiBold">{subtask.subtask_title}</ThemedText>
            <Checkbox
              style={styles.checkbox}
              value={subtaskChecks[index]}
              onValueChange={() => toggleSubtask(index)}
            />
            <ThemedText type="defaultSemiBold">{subtask.subtask_time2finish}</ThemedText>
          </View>
        ))}
      </View>
      <View style={styles.infoContainer}>
        <TouchableOpacity onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
          <FontAwesome5 name="info-circle" size={24} color="#636363" />
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

export const ViewAllComponent = ({ tasks }: { tasks: any[] }) => {
  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => <TaskItem task={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        alignItems:'center',
        marginTop:10,
        flexDirection:'column',
    },
    percentageText: {
        textAlign: 'right',
    },
    fl_subContainer:{
      margin:10,
      paddingTop:5,
      paddingLeft:12,
      backgroundColor:'#202020',
      borderTopColor:'#FF3131',
      borderTopWidth:12,
      borderRadius:12,
      width:width*0.80,
      height:140,
    },
    infoContainer:{
      alignSelf:'flex-end',
      position:'absolute',
      marginTop:95,
      paddingRight:5,
    },
    fl_subContainerTop:{
      flexDirection: 'row',
      alignItems: 'center',
      paddingEnd:10,
      justifyContent:'space-between',
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

export default ViewAllComponent;
