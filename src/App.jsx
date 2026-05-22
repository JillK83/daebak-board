import { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import StatusBoard from './components/StatusBoard';
import { supabase } from './lib/supabase';

const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';

function App() {
  const [dramas, setDramas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDramas() {
      const { data, error } = await supabase
        .from('kdramas')
        .select('*');
      
      if (error) {
        console.error('Error fetching dramas:', error);
      } else if (data) {
        console.log('Raw data from Supabase:', data);
        const mappedData = data.map(d => ({
          ...d,
          column: d.status === 'to_watch' ? 'backlog' : d.status,
          year: d.release_year,
          male_lead: d.featured_male_cast,
          female_lead: d.featured_female_cast,
          platforms: d.platforms ? d.platforms.split(',').map(s => s.trim()) : [],
        }));
        setDramas(mappedData);
      }
      setIsLoading(false);
    }

    fetchDramas();
  }, []);

  const stats = {
    tracked: dramas.length,
    active: dramas.filter(d => d.column === 'watching').length,
    done: dramas.filter(d => d.column === 'completed').length
  };

  return (
    <div className="flex flex-col min-h-screen bg-base w-full h-full font-nunito text-text-primary">
      {isDemoMode && (
        <div className="bg-[#FCE8D8] text-[#8B4A20] text-center text-[11px] py-[6px] font-nunito font-semibold border-b border-[#E0AA80]">
          Demo mode: changes are temporary and reset on refresh
        </div>
      )}
      <TopBar stats={stats} />
      <StatusBoard dramas={dramas} setDramas={setDramas} isLoading={isLoading} />
    </div>
  );
}

export default App;
