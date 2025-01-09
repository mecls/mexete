import { StyleSheet, SafeAreaView, View, TouchableOpacity, Dimensions, FlatList, Alert } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import * as Haptics from 'expo-haptics';
import Checkbox from 'expo-checkbox';
import { useEffect, useMemo, useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/src/providers/AuthProvider';
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
const TaskItem = ({ task }: { task: any }) => {
  const [subtaskData, setSubtaskData] = useState<any[]>([]);
  const [subtaskChecks, setSubtaskChecks] = useState<boolean[]>([]);



  //THIS SHOULDN'T RE-RENDER EVERY TIME THE TASK IS RENDERED
  //I'M USING USEMEMO TO AVOID RE-RENDERING
  //BUT IT'S NOT WORKING
  //I'M USING USEEFFECT TO FETCH THE SUBTASKS
  //BUT IT'S RE-RENDERING EVERY TIME THE TASK IS RENDERED
  useEffect(() => {
    const fetchSubtasks = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          Alert.alert('Authentication error', 'User not authenticated.');
          return;
        }

        const { data: subtasks, error } = await supabase
          .from('subtasks')
          .select('*')

        if (error) {
          console.error('Error fetching subtasks:', error);
          Alert.alert('Error fetching subtasks');
        } else {
          setSubtaskData(subtasks || []);
          setSubtaskChecks(subtasks.map(() => false)); // Initialize check states
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };

    fetchSubtasks();
  }, []);

  const updatePercentage = () => {
    const totalSubtasks = subtaskChecks.length;
    const completedSubtasks = subtaskChecks.filter((checked) => checked).length;
    return totalSubtasks > 0
      ? `${Math.round((completedSubtasks / totalSubtasks) * 100)}%`
      : '0%';
  };

  const memoizedSubtasks = useMemo(() => subtaskData, [subtaskData]);

  const completedPercentage = useMemo(() => updatePercentage(), [subtaskChecks]);

  const toggleSubtask = (index: number) => {
    const updatedChecks = [...subtaskChecks];
    updatedChecks[index] = !updatedChecks[index];
    setSubtaskChecks(updatedChecks);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
          <ThemedText type="subtitle">{task.title || ''}</ThemedText>
          {subtaskData.length > 0 && (
            <ThemedText type="title" style={styles.percentageText}>
              {completedPercentage}
            </ThemedText>
          )}
        </View>
        <View style={styles.fl_subContainerBody}>
          {memoizedSubtasks.map((subtask: any, index: number) => (
            <View key={subtask.id} style={{ flexDirection: 'row', gap: 5 }}>
              <ThemedText type="defaultSemiBold">{subtask.title || ''}</ThemedText>
              <Checkbox
                style={styles.checkbox}
                value={subtaskChecks[index]}
                onValueChange={() => toggleSubtask(index)}
              />
              <ThemedText type="defaultSemiBold">({subtask.timeToFinish || ''}min)</ThemedText>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};


export const ViewAllComponent = ({ tasks }: { tasks: any[] }) => {

 // Ordenação de tasks
 const sortedTasks = useMemo(() => {
  return tasks.sort((a, b) => {
    const priorityA = parseInt(a.priority_level) || Infinity;
    const priorityB = parseInt(b.priority_level) || Infinity;

    const priorityComparison = priorityA - priorityB;
    if (priorityComparison === 0) {
      return a.id - b.id;
    }
    return priorityComparison;
  });
}, [tasks]);

  return (
    <FlatList
    data={sortedTasks}
    renderItem={({ item }) => <TaskItem task={item}  />}
    keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
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
