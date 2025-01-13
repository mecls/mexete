import { StyleSheet, SafeAreaView, View, Dimensions, TouchableOpacity, FlatList, AppState } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import Checkbox from 'expo-checkbox';
import { useEffect, useMemo, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import AntDesign from '@expo/vector-icons/AntDesign';
import useStreak from '../hooks/useStreak';
import { supabase } from '@/lib/supabase';
import { reload } from 'expo-router/build/global-state/routing';

const { width } = Dimensions.get('window');

// Utility function to get priority color
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

// Component for individual priority item
const PriorityItem = ({ task, date }: { task: any, date: Date }) => {
  // console.log("Data of date is: " + task.id);
  const { updateStreak } = useStreak();

  // Convert `task.date` to Date for comparison
  const taskDate = new Date(task.date);
  const today = new Date().toISOString().split('T')[0];
  const isToday = taskDate.toISOString().split('T')[0] === today;

  if (!isToday) {
    return null; // Render nothing if the task is not for today
  }

  const [isChecked, setIsChecked] = useState(task.is_finished);

  // Break title into two parts if it exceeds 10 characters
  const formattedTitle =
    task.title.length > 50
      ? [task.title.slice(0, Math.ceil(task.title.length / 2)), task.title.slice(Math.ceil(task.title.length / 2))]
      : [task.title];


  // Toggle task completion
  // const toggleSubtask = async (index: number) => {
  //   try {
  //     const { error } = await supabase
  //       .from('tasks')
  //       .update({ is_finished: !isChecked,
  //         subtasks: {
  //           is_finished: !isChecked
  //         }
  //        })
  //       .eq('id', task.id);

  //     if (error) {
  //       console.error('Error updating task:', error);
  //       return;
  //     }

  //     setIsChecked(!isChecked);
  //     updateStreak(task.date); // Update the streak if conditions are met
  //     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  //   } catch (err) {
  //     console.error('Error toggling task completion:', err);
  //   }
  // };

  const toggleTaskCompletion = async (index: number) => {
    try {
      // Toggle the main task's `is_finished` status
      const newStatus = !isChecked;
  
      // Update the main task's `is_finished` status
      const { error: taskError } = await supabase
        .from('tasks')
        .update({ is_finished: newStatus })
        .eq('id', task.id);
  
      if (taskError) {
        console.error('Error updating main task:', taskError);
        return;
      }
  
      // Update all related subtasks' `is_finished` status
      const { error: subtaskError } = await supabase
        .from('subtasks')
        .update({ is_finished: newStatus })
        .eq('task_id', task.id); // Assuming `task_id` links subtasks to the main task
  
      if (subtaskError) {
        console.error('Error updating subtasks:', subtaskError);
        return;
      }
  
      // Update the local state
      setIsChecked(newStatus); // Update the main task's checkbox state
      updateStreak(task.date); // Update streak
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Haptic feedback
      console.log('Task and related subtasks updated successfully');
    } catch (err) {
      console.error('Unexpected error toggling task completion:', err);
    }
  };
  
  
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={[styles.container]}>
        {formattedTitle.map((line, index: number) => (
          <View key={index} style={styles.fl_subContainerBody}>
            <View key={index} style={styles.taskContainer}>
              <MaterialIcons
                name="circle"
                size={10}
                style={{ paddingRight: 5 }}
                color={getPriorityColor(task.priority_level)}
              />
              <ThemedText type="defaultSemiBold" style={styles.taskText}>
                {line}
              </ThemedText>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={() => toggleTaskCompletion(index)}
              />
            </View>
          </View>
        ))}

      </View>
    </SafeAreaView>
  );
};

// Component for the list of priorities
export const PriorityList = ({ tasks }: { tasks: any[] }) => {

  // Ordenação de tasks
  const sortedTasks = useMemo(() => tasks.sort((a, b) => {
    // Converte 'priority_lvl' para número, tratando valores vazios ou inválidos como prioridade máxima (Infinity)
    const priorityA = parseInt(a.priority_level) || Infinity;
    const priorityB = parseInt(b.priority_level) || Infinity;

    // Primeiro, ordena por prioridade (ordem crescente)
    const priorityComparison = priorityA - priorityB;

    // Se as prioridades forem iguais, ordena por ID (ordem crescente)
    if (priorityComparison === 0) {
      return a.id - b.id;
    }

    return priorityComparison;


  }), [tasks]);

  // console.log(sortedTasks);


  return (
    <View style={styles.listContainer}>
      <FlatList
        data={sortedTasks}
        renderItem={({ item }) => (
          <PriorityItem key={item.id} task={item} date={new Date()} />
        )}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    padding: 0,
    alignItems: 'center',
    flexDirection: 'column',
  },
  container: {
  },
  listContainer: {
    flex: 1,
    marginLeft: 5,
  },
  fl_subContainerBody: {
    marginVertical: 8,

  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically
    justifyContent: 'space-between',
    width: width * 0.4,
    padding: 1,
  },
  taskText: {
    flex: 1, // Allow text to take available space
    fontSize: 16,
    fontWeight: 'bold'
  },
  checkbox: {
    marginLeft: 5, // Add spacing between text and checkbox
    borderRadius: 5,
    padding: 10,
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.16,
  },
  noTasksText: {
    marginTop: 10,
    fontSize: 16,
    color: '#636363',
  },
});

export default PriorityList;