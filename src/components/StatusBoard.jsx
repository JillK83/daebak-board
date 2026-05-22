import StatusSection from './StatusSection';

export default function StatusBoard({ dramas, setDramas }) {
  const handleMoveDrama = (id, targetColumn) => {
    setDramas(prev => prev.map(d => d.id === id ? { ...d, column: targetColumn } : d));
  };

  const handleUpdateRating = (id, newRating) => {
    setDramas(prev => prev.map(d => d.id === id ? { ...d, rating: newRating } : d));
  };

  const handleDeleteDrama = (id) => {
    setDramas(prev => prev.filter(d => d.id !== id));
  };

  const handleEditDrama = (id) => {
    // handled inside DramaCard (console.log)
  };

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
