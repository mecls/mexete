import { useEffect, useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import { Alert } from 'react-native';

// This is the hook that gets the streak from the database
// It also updates the streak in the database when the user completes a task
// It also refreshes the streak in the database

export default function useStreak() {
  const { profile } = useAuth();
  const [streak, setStreak] = useState(profile?.streak || 0);
  const [lastStreakUpdate, setLastStreakUpdate] = useState(profile?.last_streak_update || null);

  const [taskData, setTaskData] = useState<{ date: string }[]>([]);

  // Modified useEffect to handle task dates correctly
  useEffect(() => {
    const fetchTasks = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get all tasks for today
      const today = new Date().toISOString().split('T')[0];
      let { data: tasks, error } = await supabase
        .from('tasks')
        .select('date')
        .eq('user_id', user.id)
        .eq('date', today);  // Only fetch today's tasks

      if (error) {
        Alert.alert('Error fetching tasks');
        return;
      }
      if (tasks) {
        setTaskData(tasks);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchStreak = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          streak (
            count,
            last_updated
          )
        `)
        .eq('id', profile?.id)
        .single();

      if (error) {
        console.error('Error fetching profile and streak:', error);
      } else {
        setStreak(data.streak?.count || 0);
        setLastStreakUpdate(data.streak?.last_updated || null);
      }
    };

    if (profile) {
      fetchStreak();
    }
  }, [profile]);

  // Add refreshStreak function here
  const refreshStreak = async () => {
    if (profile) {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
            *,
            streak (
              count,
              last_updated
            )
          `)
        .eq('id', profile?.id)
        .single();

      if (error) {
        console.error('Error fetching profile and streak:', error);
      } else {
        setStreak(data.streak?.count || 0);
        setLastStreakUpdate(data.streak?.last_updated || null);
      }
    }
  };
  
  // Modified function signature to accept the task date
  const updateStreak = async (completedTaskDate: string) => {
    const today = new Date().toISOString().split('T')[0];
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error('User not authenticated');
      return;
    }

    // First check: Is the completed task from today?
    if (completedTaskDate !== today) {
      console.log('Task is not from today, streak will not be updated');
      return;
    }

    // Second check: Has the streak already been updated today?
    if (lastStreakUpdate === today) {
      console.log('Streak already updated today');
      return;
    }

    // If we get here, we know:
    // 1. The completed task is from today
    // 2. We haven't updated the streak yet today

    // Fetch the current streak from the database
    const { data: streakData, error: fetchError } = await supabase
      .from('streak')
      .select('count, last_updated')
      .eq('user_id', user.id)
      .single();

    if (fetchError) {
      console.error('Error fetching streak:', fetchError);
      return;
    }

    const currentStreak = streakData?.count || 0;
    const newStreak = currentStreak + 1;

    const { error: updateError } = await supabase
      .from('streak')
      .update({
        count: newStreak,
        last_updated: today
      })
      .eq('user_id', user.id)
      .single();

    if (!updateError) {
      setStreak(newStreak);
      setLastStreakUpdate(today);
      console.log('Streak updated to:', newStreak);
    } else {
      console.error('Error updating streak:', updateError);
    }
  };
  console.log('Profile object:', streak);
  return { streak, updateStreak, refreshStreak };
}
