import { StyleSheet, SafeAreaView, View, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Checkbox from 'expo-checkbox';
import { useMemo, useState } from 'react';
import { Priorities } from '../assets/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import * as Haptics from 'expo-haptics';
import AntDesign from '@expo/vector-icons/AntDesign';
import tasks from '@/assets/data/tasks';

const { width } = Dimensions.get('window');

// Utility function to get priority color
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

// Component for individual priority item
const PriorityItem = ({ task, date}: { task: any, date: Date}) => {
  console.log("Data of date is: " + task.id);

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

  const [maintaskChecks, setMaintaskChecks] = useState(
    tasks?.map(() => false) || []
  );

  const updatePercentage = () => {
    const totalTasks = maintaskChecks.length;
    const completedTasks = maintaskChecks.filter(Boolean).length;
    return totalTasks > 0 ? `${Math.round((completedTasks / totalTasks) * 100)}%` : '0%';
  };

  const completedPercentage = useMemo(() => updatePercentage(), [maintaskChecks]);

  const toggleSubtask = (index: number) => {
    const updatedChecks = [...maintaskChecks];
    updatedChecks[index] = !updatedChecks[index];
    setMaintaskChecks(updatedChecks);
  };
  
  const taskItemList = (task: { id: string; }, tasks: any) => {
    // console.log("Task id: " + task.id);
  
    for (let t of tasks) { // Itera diretamente pelos objetos da lista
      if (t.id === task.id) { // Compara o id do objeto com o task.id
        return t; // Retorna o objeto correspondente
      }
    }
    return null; // Caso não encontre nenhum objeto correspondente
  };
  
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={[styles.container]}>
        {taskItemList.length>0 ? ( //ID MUST BE UNIQUE AND ITS NOT IT
          <View key={task.id} style={styles.fl_subContainerBody}>
              <View key={task.id} style={styles.taskContainer}>
                <MaterialIcons
                  name="circle"
                  size={10}
                  style={{ paddingRight: 5 }}
                  color={getPriorityColor(task.priority_lvl?.[0])} 
                />
                <ThemedText type="defaultSemiBold" style={styles.taskText}>
                  {task.title}
                </ThemedText>
                <Checkbox
                  style={styles.checkbox}
                  value={maintaskChecks[task.id]}
                  onValueChange={() => toggleSubtask(task.id)}
                />
              </View>
          </View>
        ) : (
          // Placeholder when no tasks are available
          <View style={styles.noTasksContainer}>
             <TouchableOpacity  >
                    <Link href={'/(tabs)/(tasks)'} onPress={()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                      <AntDesign name="pluscircleo" size={30} color="#636363" />
                    </Link>
              </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

// Component for the list of priorities
export const PriorityList = ({ tasks }: { tasks: any[] }) => {
  return (
    <View style={styles.listContainer}>
      {tasks.map((item) => (
        <PriorityItem key={item.id} task={item} date={new Date()} />
      ))}
     </View>
  );
};

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    padding:0,
    alignItems: 'center',
    flexDirection: 'column',
  },
  container: {
  },
  listContainer: {
    flex: 1,
    margin: 5,
  },
  fl_subContainerBody: {
    marginVertical:10,

  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically
    justifyContent: 'space-between',
    width: width * 0.4,
    padding:0,
  },
  taskText: {
    flex: 1, // Allow text to take available space
    fontSize: 16,
  },
  checkbox: {
    marginLeft: 10, // Add spacing between text and checkbox
    borderRadius: 5,
    padding:10,
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width*0.16,
  },
  noTasksText: {
    marginTop: 10,
    fontSize: 16,
    color: '#636363',
  },
});

export default PriorityList;