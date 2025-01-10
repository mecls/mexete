import { useEffect, useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '@/lib/supabase';

export default function useStreak() {
  const { profile } = useAuth();
  const [streak, setStreak] = useState(profile?.streak || 0);
  const [lastStreakUpdate, setLastStreakUpdate] = useState(profile?.last_streak_update || null);

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
 
  const updateStreak = async () => {
    const today = new Date().toISOString().split('T')[0];
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error('User not authenticated');
      return;
    }

    if (lastStreakUpdate === today) {
      return;
    }

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
