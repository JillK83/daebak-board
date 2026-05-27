import { useState } from 'react';
import StatusSection from './StatusSection';
import { supabase } from '../lib/supabase';
import { track } from '../utils/analytics';

const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';

const STATUS_LABELS = {
  to_watch: 'Backlog / To Watch',
  watching: 'Currently Watching',
  completed: 'Completed & Scored',
  rewatch: 'The Rewatch Pile'
};

export default function StatusBoard({ dramas, setDramas, isLoading }) {
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleAddDrama = async (columnId, payload) => {
    const newId = isDemoMode ? -Date.now() : undefined;
    const dbStatus = columnId === 'backlog' ? 'to_watch' : columnId;
    const dbPayload = {
      source: 'manual',
      ...payload,
      status: dbStatus,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    let insertedId = newId;
    if (!isDemoMode) {
      const { data, error } = await supabase.from('kdramas').insert([dbPayload]).select().single();
      if (error) {
        console.error("Error adding:", error);
        track('supabase_error', { operation: 'add_drama', error: error.message });
        return;
      }
      if (data) insertedId = data.id;
    }
    
    track('manual_show_added', { title: payload.title });
    
    const newDramaLocal = {
      id: insertedId,
      column: columnId,
      title: payload.title,
      year: payload.release_year,
      totalEpisodes: payload.total_episodes,
      male_lead: payload.featured_male_cast,
      female_lead: payload.featured_female_cast,
      platforms: payload.platforms ? payload.platforms.split(',').map(s => s.trim()) : [],
      poster_url: payload.poster_url,
      rating: null,
      tmdb_id: payload.tmdb_id || null,
      source: payload.source || 'manual',
    };
    setDramas(prev => [...prev, newDramaLocal]);
  };

  const handleUpdateDramaDetails = async (id, payload) => {
    const dbPayload = { ...payload, updated_at: new Date().toISOString() };
    
    if (!isDemoMode && !String(id).startsWith('-')) {
      const { error } = await supabase.from('kdramas').update(dbPayload).eq('id', id);
      if (error) {
        console.error("Error editing:", error);
        track('supabase_error', { operation: 'edit_drama', error: error.message });
        return;
      }
    }
    
    setDramas(prev => prev.map(d => d.id === id ? {
      ...d,
      title: payload.title,
      year: payload.release_year,
      totalEpisodes: payload.total_episodes,
      currentEpisode: payload.current_episode,
      male_lead: payload.featured_male_cast,
      female_lead: payload.featured_female_cast,
      platforms: payload.platforms ? payload.platforms.split(',').map(s => s.trim()) : [],
      poster_url: payload.poster_url,
    } : d));
  };

  const handleMoveDrama = async (id, targetColumn) => {
    track('status_updated', { drama_id: id, new_status: targetColumn });
    
    // Find original column for rollback
    const originalDrama = dramas.find(d => d.id === id);
    const originalColumn = originalDrama ? originalDrama.column : null;
    
    // Optimistic update
    setDramas(prev => prev.map(d => d.id === id ? { ...d, column: targetColumn } : d));
    
    try {
      if (!isDemoMode && !String(id).startsWith('-')) {
        const dbStatus = targetColumn === 'backlog' ? 'to_watch' : targetColumn;
        const { error } = await supabase
          .from('kdramas')
          .update({ status: dbStatus, updated_at: new Date().toISOString() })
          .eq('id', id);
        if (error) {
          throw error;
        }
      }
    } catch (err) {
      console.error("Error moving drama:", err);
      track('supabase_error', { operation: 'move_drama', error: err.message });
      
      // Rollback to original column
      if (originalColumn) {
        setDramas(prev => prev.map(d => d.id === id ? { ...d, column: originalColumn } : d));
      }
      
      // Show toast
      showToast(err.message || 'Failed to move drama. Reverting changes.');
    }
  };

  const handleUpdateRating = async (id, newRating) => {
    track('rating_updated', { drama_id: id, new_rating: newRating });
    
    // Find original rating for rollback
    const originalDrama = dramas.find(d => d.id === id);
    const originalRating = originalDrama ? originalDrama.rating : null;
    
    // Optimistic update
    setDramas(prev => prev.map(d => d.id === id ? { ...d, rating: newRating } : d));
    
    try {
      if (!isDemoMode && !String(id).startsWith('-')) {
        const { error } = await supabase
          .from('kdramas')
          .update({ rating: newRating, updated_at: new Date().toISOString() })
          .eq('id', id);
        if (error) {
          throw error;
        }
      }
    } catch (err) {
      console.error("Error updating rating:", err);
      track('supabase_error', { operation: 'update_rating', error: err.message });
      
      // Rollback to original rating
      setDramas(prev => prev.map(d => d.id === id ? { ...d, rating: originalRating } : d));
      
      // Show toast
      showToast(err.message || 'Failed to update rating. Reverting changes.');
    }
  };

  const handleDeleteDrama = async (id) => {
    const previousDramas = [...dramas];
    
    // Optimistic delete
    setDramas(prev => prev.filter(d => d.id !== id));
    
    if (isDemoMode || String(id).startsWith('-')) {
      track('show_deleted', { drama_id: id });
      return;
    }
    
    try {
      track('show_deleted', { drama_id: id });
      const { error } = await supabase
        .from('kdramas')
        .delete()
        .eq('id', id);
      if (error) {
        throw error;
      }
    } catch (err) {
      console.error("Error deleting drama:", err);
      track('supabase_error', { operation: 'delete_drama', error: err.message });
      setDramas(previousDramas);
      showToast(err.message || 'Failed to delete drama. Reverting changes.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 overflow-hidden font-nunito flex items-center justify-center">
        <i className="ti ti-loader-2 text-[32px] text-text-ghost animate-spin"></i>
      </div>
    );
  }

  const backlogDramas = dramas.filter(d => d.column === 'backlog');
  const watchingDramas = dramas.filter(d => d.column === 'watching');
  const completedDramas = dramas.filter(d => d.column === 'completed');
  const rewatchDramas = dramas.filter(d => d.column === 'rewatch');

  return (
    <div className="flex-1 overflow-x-auto overflow-y-auto font-nunito flex flex-col items-center p-8 bg-app-bg">
      <div className="flex gap-6 min-w-max h-full">
        <StatusSection 
          id="backlog"
          label={STATUS_LABELS.to_watch}
          icon="ti-bookmark"
          count={backlogDramas.length}
          dramas={backlogDramas}
          allDramas={dramas}
          emptyStateText="Nothing here yet. Add your first drama."
          onMoveDrama={handleMoveDrama}
          onUpdateRating={handleUpdateRating}
          onDeleteDrama={handleDeleteDrama}
          onEditDrama={handleUpdateDramaDetails}
          onAddDrama={handleAddDrama}
        />
        <StatusSection 
          id="watching"
          label={STATUS_LABELS.watching}
          icon="ti-player-play"
          count={watchingDramas.length}
          dramas={watchingDramas}
          allDramas={dramas}
          emptyStateText="Nothing playing. Time to press play."
          onMoveDrama={handleMoveDrama}
          onUpdateRating={handleUpdateRating}
          onDeleteDrama={handleDeleteDrama}
          onEditDrama={handleUpdateDramaDetails}
          onAddDrama={handleAddDrama}
        />
        <StatusSection 
          id="completed"
          label={STATUS_LABELS.completed}
          icon="ti-star"
          count={completedDramas.length}
          dramas={completedDramas}
          allDramas={dramas}
          emptyStateText="No finished dramas yet. Keep watching."
          onMoveDrama={handleMoveDrama}
          onUpdateRating={handleUpdateRating}
          onDeleteDrama={handleDeleteDrama}
          onEditDrama={handleUpdateDramaDetails}
          onAddDrama={handleAddDrama}
        />
        <StatusSection 
          id="rewatch"
          label={STATUS_LABELS.rewatch}
          icon="ti-repeat"
          count={rewatchDramas.length}
          dramas={rewatchDramas}
          allDramas={dramas}
          emptyStateText="Nothing here yet. Time to start a new journey."
          onMoveDrama={handleMoveDrama}
          onUpdateRating={handleUpdateRating}
          onDeleteDrama={handleDeleteDrama}
          onEditDrama={handleUpdateDramaDetails}
          onAddDrama={handleAddDrama}
        />
      </div>

      <footer className="mt-12 pb-6 flex items-center justify-center gap-3 opacity-60">
        <img src="/src/assets/tmdb-logo.svg" alt="TMDB logo" className="h-4" />
        <span className="text-xs text-stone-500">
          Data and images provided by TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.
        </span>
      </footer>

      {/* Toast Notification */}
      {toast && (
        <div 
          style={{
            animation: 'slideUp 0.3s ease-out forwards',
          }}
          className="fixed bottom-6 right-6 bg-[#2C2C2C] text-[#FFFFFF] px-4 py-3 rounded-[8px] shadow-card-hover border border-border font-nunito text-xs flex items-center gap-2 z-50"
        >
          <style>{`
            @keyframes slideUp {
              from {
                transform: translateY(20px);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
          `}</style>
          <i className="ti ti-alert-circle text-[#E87C7C] text-[14px]"></i>
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
