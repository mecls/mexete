import { StyleSheet, SafeAreaView, View, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import * as Haptics from 'expo-haptics';
import Checkbox from 'expo-checkbox';
import { useEffect, useMemo, useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import tasksData from '@/assets/data/tasks'; // Importa as tasks

const { width } = Dimensions.get('window');

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

const TaskItem = ({ task, date}: { task: any, date: Date}) => {
 
  if (!date) {
    console.warn("Date is undefined!");
    return null; // Render nothing if the date is missing
  }
  const taskDate = new Date(task.date);
  // console.log("Data of date is: " + task.date);

  // Compare only the day, month, and year to ensure a match
  const isToday =
    taskDate.getDate() === date.getDate() &&
    taskDate.getMonth() === date.getMonth() &&
    taskDate.getFullYear() === date.getFullYear();

  if (!isToday) {
    return null; // If the task is not for today, render nothing
  }
 
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
     <SafeAreaView >
    <View
      style={[
        styles.fl_subContainer,
        { borderTopColor: getPriorityColor(task.priority_lvl) },
      ]}
    >
      <View style={styles.fl_subContainerTop}>
        <ThemedText type="subtitle">{task.title}</ThemedText>
        {task.subtasks && <ThemedText type="title" style={styles.percentageText}>{completedPercentage}</ThemedText>}
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


export const TaskList = () => {
  
  const [tasks, setTasks] = useState<any[]>([]);

  const orderTaskByPriority = (tasks: { id: number; priority_lvl: string }[]) => {
    return tasks.slice().sort((a, b) => {
      // Converte `priority_lvl` para números; trata valores inválidos como Infinity
      const priorityA = parseInt(a.priority_lvl || '0') || Infinity;
      const priorityB = parseInt(b.priority_lvl || '0') || Infinity;

      // Primeiro, ordena por prioridade (ordem crescente)
      const priorityComparison = priorityA - priorityB;

      // Se as prioridades forem iguais, ordena por ID (ordem crescente)
      if (priorityComparison === 0) {
        return a.id - b.id;
      }

      return priorityComparison;
    });
  };

  useEffect(() => {
    // Simula carregamento dos dados e ordena
    const fetchTasks = async () => {
      setTasks(orderTaskByPriority(tasksData));
    };
    fetchTasks();
  }, []);

  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => <TaskItem task={item} date={new Date()}/>}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({

    percentageText: {
        textAlign: 'right',
    },
    fl_subContainer:{
      margin:10,
      // marginTop:10,
      paddingTop:5,
      paddingLeft:12,
      backgroundColor:'#202020',
      borderTopColor:'#FF3131',
      borderTopWidth:10,
      borderRadius:20,
      width:width*0.9,
      height:125,
    },
    infoContainer:{
      alignSelf:'flex-end',
      position:'absolute',
      marginTop:85,
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
      padding:0, // make it 10 after implementing flatlist in subtasks
    },
  });

export default TaskList;
