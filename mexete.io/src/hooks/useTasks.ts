import { useState } from 'react';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function useTasks() {
 const [taskData, setTaskData] = useState<any[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let { data, error } = await supabase.from('tasks').select('*').eq('user_id', user.id)
      if (error) {
        Alert.alert('Error fetching tasks');
        return;
      }
      if (data) {
        setTaskData(data);
      }
    };

    fetchTasks();
  }, [taskData]);

  const checkAndUpdateTaskCompletion = async (taskId: string) => {
    // Get all subtasks for this task
    const { data: subtasks, error: subtasksError } = await supabase
      .from('subtasks')
      .select('is_finished')
      .eq('task_id', taskId);

    if (subtasksError) {
      Alert.alert('Error checking subtasks');
      return;
    }

    // If there are no subtasks, return
    if (!subtasks || subtasks.length === 0) return;

    // Check if all subtasks are finished
    const allSubtasksFinished = subtasks.every(subtask => subtask.is_finished);

    // Update task status if all subtasks are finished
    if (allSubtasksFinished) {
      const { error: updateError } = await supabase
        .from('tasks')
        .update({ is_finished: true })
        .eq('id', taskId);

      if (updateError) {
        Alert.alert('Error updating task status');
      }
    }
  };

}