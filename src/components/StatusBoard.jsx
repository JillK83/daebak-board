import { useState } from 'react';
import StatusSection from './StatusSection';
import { supabase } from '../lib/supabase';
import { track } from '../utils/analytics';

const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';

export default function StatusBoard({ dramas, setDramas, isLoading }) {
  const handleAddDrama = async (columnId, payload) => {
    const newId = isDemoMode ? -Date.now() : undefined;
    const dbStatus = columnId === 'backlog' ? 'to_watch' : columnId;
    const dbPayload = { ...payload, status: dbStatus, source: 'manual', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    
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
      male_lead: payload.featured_male_cast,
      female_lead: payload.featured_female_cast,
      platforms: payload.platforms ? payload.platforms.split(',').map(s => s.trim()) : [],
      poster_url: payload.poster_url,
    } : d));
  };

  const handleMoveDrama = async (id, targetColumn) => {
    track('status_updated', { drama_id: id, new_status: targetColumn });
    // Optimistic update
    setDramas(prev => prev.map(d => d.id === id ? { ...d, column: targetColumn } : d));
    
    if (!isDemoMode && !String(id).startsWith('-')) {
      const dbStatus = targetColumn === 'backlog' ? 'to_watch' : targetColumn;
      const { error } = await supabase
        .from('kdramas')
        .update({ status: dbStatus, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) {
        console.error("Error moving drama:", error);
        track('supabase_error', { operation: 'move_drama', error: error.message });
      }
    }
  };

  const handleUpdateRating = async (id, newRating) => {
    track('rating_updated', { drama_id: id, new_rating: newRating });
    setDramas(prev => prev.map(d => d.id === id ? { ...d, rating: newRating } : d));
    
    if (!isDemoMode && !String(id).startsWith('-')) {
      const { error } = await supabase
        .from('kdramas')
        .update({ rating: newRating, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) {
        console.error("Error updating rating:", error);
        track('supabase_error', { operation: 'update_rating', error: error.message });
      }
    }
  };

  const handleDeleteDrama = async (id) => {
    track('show_deleted', { drama_id: id });
    setDramas(prev => prev.filter(d => d.id !== id));
    
    if (!isDemoMode && !String(id).startsWith('-')) {
      const { error } = await supabase
        .from('kdramas')
        .delete()
        .eq('id', id);
      if (error) {
        console.error("Error deleting drama:", error);
        track('supabase_error', { operation: 'delete_drama', error: error.message });
      }
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
    <div className="flex-1 overflow-x-auto overflow-y-hidden font-nunito flex items-start justify-center p-8 bg-app-bg">
      <div className="flex gap-6 min-w-max h-full">
        <StatusSection 
          id="backlog"
          label="Backlog / My Watchlist"
          icon="ti-device-cassette"
          dramas={backlogDramas}
          emptyStateText="Nothing here yet. Add your first drama."
          onMoveDrama={handleMoveDrama}
          onUpdateRating={handleUpdateRating}
          onDeleteDrama={handleDeleteDrama}
          onEditDrama={handleUpdateDramaDetails}
          onAddDrama={handleAddDrama}
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
          onEditDrama={handleUpdateDramaDetails}
          onAddDrama={handleAddDrama}
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
          onEditDrama={handleUpdateDramaDetails}
          onAddDrama={handleAddDrama}
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
          onEditDrama={handleUpdateDramaDetails}
          onAddDrama={handleAddDrama}
        />
      </div>
    </div>
  );
}
