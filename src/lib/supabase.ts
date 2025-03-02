import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bmcacnwkhwnmgqcpeprh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtY2FjbndraHdubWdxY3BlcHJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NzU2MzAsImV4cCI6MjA1NjQ1MTYzMH0.pQQ6nZhCuQ4o6RuAOAFkF-38jTUK56nUYBOo9fQz-GE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 