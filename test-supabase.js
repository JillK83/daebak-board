import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eiowhxkcyicuhnuyzfhk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpb3doeGtjeWljdWhudXl6ZmhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MDIyMzcsImV4cCI6MjA4NjE3ODIzN30.O3kiv-JvgrE-8267UeS6ITDpPSebs9NNlLVdYwCUqZ4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  const { data, error } = await supabase.from('kdramas').select('*');
  console.log(JSON.stringify(data, null, 2));
}
main();
