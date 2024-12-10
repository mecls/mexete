import { StyleSheet, SafeAreaView, View, Dimensions, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Checkbox from 'expo-checkbox';
import { useMemo, useState } from 'react';
import { Priorities } from '../assets/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import * as Haptics from 'expo-haptics';
import AntDesign from '@expo/vector-icons/AntDesign';

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
const PriorityItem = ({ priority}: { priority: any}) => {
  
  // if (!date) {
  //   console.warn("Date is undefined!");
  //   return null; // Render nothing if the date is missing
  // }
  // const taskDate = new Date(pr.date);
  // console.log("Data of date is: " + task.date);

  // // Compare only the day, month, and year to ensure a match
  // const isToday =
  //   taskDate.getDate() === date.getDate() &&
  //   taskDate.getMonth() === date.getMonth() &&
  //   taskDate.getFullYear() === date.getFullYear();

  // if (!isToday) {
  //   return null; // If the task is not for today, render nothing
  // }

  const [maintaskChecks, setMaintaskChecks] = useState(
    priority.priority_item?.map(() => false) || []
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

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={[styles.container]}>
        {priority.priority_item && priority.priority_item.length > 0 ? (
          <View style={styles.fl_subContainerBody}>
            {priority.priority_item.map((task: any, index: number) => (
              <View key={task.tasks_data.id} style={styles.taskContainer}>
                <MaterialIcons
                  name="circle"
                  size={10}
                  style={{ paddingRight: 5 }}
                  color={getPriorityColor(task.tasks_data.priority_lvl?.[0])} // Corrected line
                />
                <ThemedText type="defaultSemiBold" style={styles.taskText}>
                  {task.tasks_data.title}
                </ThemedText>
                <Checkbox
                  style={styles.checkbox}
                  value={maintaskChecks[index]}
                  onValueChange={() => toggleSubtask(index)}
                />
              </View>
            ))}
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
export const PriorityList = ({ priorities }: { priorities: Priorities[] }) => {
  return (
    <View style={styles.listContainer}>
      {priorities.map((priority) => (
        <PriorityItem key={priority.user_id} priority={priority}  />
      ))}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'column',
  },
  container: {
    justifyContent: 'space-between',
  },
  listContainer: {
    flex: 1,
    margin: 10,
  },
  fl_subContainerBody: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically
    justifyContent: 'space-between',
    width: width * 0.4,
    paddingVertical: 5,
  },
  taskText: {
    flex: 1, // Allow text to take available space
    fontSize: 16,
  },
  checkbox: {
    marginLeft: 10, // Add spacing between text and checkbox
    borderRadius: 5,
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