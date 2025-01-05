import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

// Check how to make this secure and secret
const supabaseUrl = 'https://dcehxopssgzasuststrz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjZWh4b3Bzc2d6YXN1c3RzdHJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMjEzNTYsImV4cCI6MjA1MTU5NzM1Nn0.NqlQTVrrZ25lFmdjzNl_8HKN96KZ45SST7K6ZbTA9T4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})