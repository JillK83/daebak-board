import StatusSection from './StatusSection';
import { supabase } from '../lib/supabase';

const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';

export default function StatusBoard({ dramas, setDramas, isLoading }) {
  const handleMoveDrama = async (id, targetColumn) => {
    // Optimistic update
    setDramas(prev => prev.map(d => d.id === id ? { ...d, column: targetColumn } : d));
    
    if (!isDemoMode && !String(id).startsWith('-')) {
      const dbStatus = targetColumn === 'backlog' ? 'to_watch' : targetColumn;
      const { error } = await supabase
        .from('kdramas')
        .update({ status: dbStatus, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) console.error("Error moving drama:", error);
    }
  };

  const handleUpdateRating = async (id, newRating) => {
    setDramas(prev => prev.map(d => d.id === id ? { ...d, rating: newRating } : d));
    
    if (!isDemoMode && !String(id).startsWith('-')) {
      const { error } = await supabase
        .from('kdramas')
        .update({ rating: newRating, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) console.error("Error updating rating:", error);
    }
  };

  const handleDeleteDrama = async (id) => {
    setDramas(prev => prev.filter(d => d.id !== id));
    
    if (!isDemoMode && !String(id).startsWith('-')) {
      const { error } = await supabase
        .from('kdramas')
        .delete()
        .eq('id', id);
      if (error) console.error("Error deleting drama:", error);
    }
  };

  const handleEditDrama = (id) => {
    // handled inside DramaCard (console.log)
  };

  if (isLoading) {
    return (
      <div className="flex-1 overflow-x-auto p-5 flex items-center justify-center">
         <div className="flex flex-col items-center gap-3">
           <i className="ti ti-loader animate-spin text-[24px] text-text-ghost"></i>
           <span className="font-nunito italic text-[12px] text-text-ghost">Loading board...</span>
         </div>
      </div>
    );
  }

  const backlogDramas = dramas.filter(d => d.column === 'backlog');
  const watchingDramas = dramas.filter(d => d.column === 'watching');
  const completedDramas = dramas.filter(d => d.column === 'completed');
  const rewatchDramas = dramas.filter(d => d.column === 'rewatch');

  return (
    <div className="flex-1 overflow-x-auto p-5">
      <div className="grid grid-cols-4 gap-6 min-w-[1000px] h-full items-start">
        <StatusSection 
          id="backlog"
          label="Backlog / My Watchlist"
          icon="ti-device-cassette"
          dramas={backlogDramas}
          emptyStateText="Nothing here yet. Add your first drama."
          onMoveDrama={handleMoveDrama}
          onUpdateRating={handleUpdateRating}
          onDeleteDrama={handleDeleteDrama}
          onEditDrama={handleEditDrama}
        />
        <StatusSection 
          id="watching"
          label="Currently Watching"
          icon="ti-heart-play"
          dramas={watchingDramas}
          emptyStateText="Nothing playing. Time to press play."
          onMoveDrama={handleMoveDrama}
          onUpdateRating={handleUpdateRating}
          onDeleteDrama={handleDeleteDrama}
          onEditDrama={handleEditDrama}
        />
        <StatusSection 
          id="completed"
          label="Completed / History"
          icon="ti-star"
          dramas={completedDramas}
          emptyStateText="No finished dramas yet. Keep watching."
          onMoveDrama={handleMoveDrama}
          onUpdateRating={handleUpdateRating}
          onDeleteDrama={handleDeleteDrama}
          onEditDrama={handleEditDrama}
        />
        <StatusSection 
          id="rewatch"
          label="Rewatch"
          icon="ti-repeat"
          dramas={rewatchDramas}
          emptyStateText="Nothing here yet. Time to start a new journey."
          onMoveDrama={handleMoveDrama}
          onUpdateRating={handleUpdateRating}
          onDeleteDrama={handleDeleteDrama}
          onEditDrama={handleEditDrama}
        />
      </div>
    </div>
  );
}
