
import StatusSection from './StatusSection';

export default function StatusBoard() {
  return (
    <div className="flex-1 overflow-x-auto p-5">
      <div className="grid grid-cols-4 gap-6 min-w-[1000px] h-full">
        <StatusSection 
          id="backlog"
          label="Backlog / My Watchlist"
          icon="ti-device-cassette"
          count={0}
          emptyStateText="Nothing here yet. Add your first drama."
        />
        <StatusSection 
          id="watching"
          label="Currently Watching"
          icon="ti-heart-play"
          count={0}
          emptyStateText="Nothing playing. Time to press play."
        />
        <StatusSection 
          id="completed"
          label="Completed / History"
          icon="ti-star"
          count={0}
          emptyStateText="No finished dramas yet. Keep watching."
        />
        <StatusSection 
          id="rewatch"
          label="Rewatch"
          icon="ti-repeat"
          count={0}
          emptyStateText="Nothing here yet. Time to start a new journey."
        />
      </div>
    </div>
  );
}
