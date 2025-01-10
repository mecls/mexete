import { StyleSheet, SafeAreaView, View, TouchableOpacity, Dimensions, FlatList, Alert } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import * as Haptics from 'expo-haptics';
import Checkbox from 'expo-checkbox';
import { useEffect, useMemo, useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/src/providers/AuthProvider';
import usePriorityColor from '../hooks/usePriorityColor';
import priorityColor from '../hooks/usePriorityColor';
import useStreak from '../hooks/getStreak';
const { width } = Dimensions.get('window');



const TaskItem = ({ task, subtasks, onSubtasksUpdate }: { task: any, subtasks: any[], onSubtasksUpdate: (updatedSubtasks: any[]) => void }) => {
  const [allSubtasks, setAllSubtasks] = useState<any[]>([]);

  useEffect(() => {
    setAllSubtasks(subtasks);
  }, [subtasks]);

  const updatePercentage = () => {
    const totalSubtasks = allSubtasks.length;
    const completedSubtasks = allSubtasks.filter((subtask) => subtask.is_finished).length;
    return totalSubtasks > 0
      ? `${Math.round((completedSubtasks / totalSubtasks) * 100)}%`
      : '0%';
  };

  const completedPercentage = useMemo(() => updatePercentage(), [allSubtasks]);

  const toggleSubtask = async (index: number) => {
    try {
      const currentSubtask = allSubtasks[index];
      if (!currentSubtask?.id) {
        console.error('Subtask ID is invalid:', currentSubtask);
        Alert.alert('Error', 'Invalid subtask ID.');
        return;
      }

      const newIsFinished = !currentSubtask.is_finished;

      const updatedSubtasks = [...allSubtasks];
      updatedSubtasks[index] = {
        ...currentSubtask,
        is_finished: newIsFinished,
      };
      setAllSubtasks(updatedSubtasks);

      const { data, error } = await supabase
        .from('subtasks')
        .update({ is_finished: newIsFinished })
        .eq('id', currentSubtask.id)
        .select();
        
      if (error) {
        console.error('Error updating subtask:', error);
        updatedSubtasks[index].is_finished = !newIsFinished;
        setAllSubtasks(updatedSubtasks);
        Alert.alert('Error', 'Failed to update subtask status.');
      } else {
        console.log('Subtask updated successfully:', data);
        onSubtasksUpdate(updatedSubtasks); // Propagate changes to parent
      }

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (err) {
      console.error('Unexpected error:', err);
      Alert.alert('Unexpected error', 'Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View
        style={[
          styles.fl_subContainer,
          { borderTopColor: priorityColor(task.priority_level) },
        ]}
      >
        <View style={styles.fl_subContainerTop}>
          <ThemedText type="subtitle">{task.title || ''}</ThemedText>
          {allSubtasks.length > 0 && (
            <ThemedText type="title" style={styles.percentageText}>
              {completedPercentage}
            </ThemedText>
          )}
        </View>
        <View style={styles.fl_subContainerBody}>
          {allSubtasks.map((subtask: any, index: number) => (
            <View key={subtask.id} style={{ flexDirection: 'row', gap: 5 }}>
              <ThemedText type="defaultSemiBold">{subtask.title || ''}</ThemedText>
              <Checkbox
                style={styles.checkbox}
                value={subtask.is_finished}
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
  const [subtasks, setSubtasks] = useState<any[]>([]);
  const { updateStreak } = useStreak();
  
  useEffect(() => {
    const fetchSubtasks = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          Alert.alert('Authentication error', 'User not authenticated.');
          return;
        }

        const { data: fetchedSubtasks, error } = await supabase
          .from('subtasks')
          .select('*');

        if (error) {
          console.error('Error fetching subtasks:', error);
          Alert.alert('Error fetching subtasks');
        } else {
          setSubtasks(fetchedSubtasks || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };

    fetchSubtasks();
  }, []);

  const checkTaskCompletion = (taskId: string, updatedSubtasks: any[]) => {
    const taskSubtasks = updatedSubtasks.filter(st => st.task_id === taskId);
    
    // If task has no subtasks, check task's is_finished status
    if (taskSubtasks.length === 0) {
      const task = tasks.find(t => t.id === taskId);
      return task?.is_finished === true;
    }

    // If task has subtasks, check if all are finished
    return taskSubtasks.every(st => st.is_finished === true);
  };

  const handleSubtasksUpdate = async (updatedSubtasks: any[], taskId: string) => {
    setSubtasks((prevSubtasks) =>
      prevSubtasks.map((subtask) =>
        updatedSubtasks.find((updated) => updated.id === subtask.id) || subtask
      )
    );

    // Check if this update completed the task
    if (checkTaskCompletion(taskId, updatedSubtasks)) {
      await updateStreak();
    }
  };

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

  const subtasksByTask = useMemo(() => {
    return subtasks.reduce((acc: { [key: string]: any[] }, subtask) => {
      const taskId = subtask.task_id;
      if (!acc[taskId]) {
        acc[taskId] = [];
      }
      acc[taskId].push(subtask);
      return acc;
    }, {});
  }, [subtasks]);

   return (
    <FlatList
      data={sortedTasks}
      renderItem={({ item }) => (
        <TaskItem
          task={item}
          subtasks={subtasksByTask[item.id] || []}
          onSubtasksUpdate={(updatedSubtasks) => 
            handleSubtasksUpdate(updatedSubtasks, item.id)
          }
        />
      )}
      keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
    />
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'column',
  },
  percentageText: {
    textAlign: 'right',
  },
  fl_subContainer: {
    margin: 10,
    paddingTop: 5,
    paddingLeft: 12,
    backgroundColor: '#202020',
    borderTopColor: '#FF3131',
    borderTopWidth: 12,
    borderRadius: 12,
    width: width * 0.80,
    height: 140,
  },
  infoContainer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    marginTop: 95,
    paddingRight: 5,
  },
  fl_subContainerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingEnd: 10,
    justifyContent: 'space-between',
  },
  fl_subContainerBody: {
    flexDirection: 'column',
    alignItems: 'flex-start',

  },
  checkbox: {
    alignSelf: 'center',
    borderRadius: 5,
  },
});

export default ViewAllComponent;
