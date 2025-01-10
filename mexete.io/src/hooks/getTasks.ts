import { useState } from 'react';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../../lib/supabase';

export const [taskData, setTaskData] = useState<any[]>([]);

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

