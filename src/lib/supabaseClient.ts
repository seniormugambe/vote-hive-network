import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mtwjepdmyucmmyuimiqb.supabase.co'
const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10d2plcGRteXVjbW15dWltaXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NzE3MjUsImV4cCI6MjA2NzA0NzcyNX0.E3lMPMqMVqVsjYb6krXRYRnROvPi-yVG_0gHVgflL9E'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);