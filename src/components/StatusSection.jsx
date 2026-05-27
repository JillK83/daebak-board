import { useState } from 'react';
import DramaCard from './DramaCard';
import DramaFormInline from './DramaFormInline';
import emptyColumnImg from '../assets/emptycolumn.png';

export default function StatusSection({ id, label, icon, count, dramas = [], allDramas = [], emptyStateText, onMoveDrama, onUpdateRating, onDeleteDrama, onEditDrama, onAddDrama }) {
  const [isAdding, setIsAdding] = useState(false);

  // Determine header pill styles based on column id
  const headerStyles = {
    backlog: 'bg-rose-100 border border-rose-200 text-rose-700',
    watching: 'bg-teal-100 border border-teal-200 text-teal-700',
    completed: 'bg-purple-100 border border-purple-200 text-purple-700',
    rewatch: 'bg-orange-100 border border-orange-200 text-orange-700',
  };

  const currentHeaderStyle = headerStyles[id];

  return (
    <div className="flex flex-col gap-3 min-w-[280px] w-full">
      {/* Header */}
      <div className={`flex flex-row items-center justify-between w-full rounded-xl px-4 py-[14px] ${currentHeaderStyle}`}>
        <div className="flex flex-row items-center gap-2">
          <i className={`ti ${icon} text-[20px]`}></i>
          <span className="font-nunito text-sm font-semibold tracking-widest uppercase">
            {label} <span className="font-nunito font-normal text-[12px] opacity-50 ml-1">({count})</span>
          </span>
        </div>
      </div>

      {/* Add Show Button */}
      {!isAdding && (
        <button 
          onClick={() => setIsAdding(true)}
          className="w-full bg-transparent border border-dashed border-border-dashed rounded-[8px] py-[7px] px-3 flex items-center justify-center gap-1 hover:border-logo-accent group transition-colors cursor-pointer"
        >
          <span className="font-nunito text-[12px] text-[#7A726B] group-hover:text-[#2E2A27] transition-colors">+ Add show</span>
        </button>
      )}

      {isAdding && (
        <DramaFormInline 
          allDramas={allDramas}
          onSave={(payload) => {
            onAddDrama(id, payload);
            setIsAdding(false);
          }}
          onCancel={() => setIsAdding(false)}
        />
      )}

      {/* Card List Area (empty state placeholder) */}
      {dramas.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-base border border-dashed border-border-dashed rounded-empty p-6 text-center gap-2">
          <img 
            src={emptyColumnImg}
            alt=""
            style={{ mixBlendMode: 'multiply' }}
            className="w-[120px] opacity-70 mb-2"
          />
          <p className="font-playfair italic text-[13px] text-[#7A726B]">
            {emptyStateText}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {dramas.map(drama => (
            <DramaCard 
              key={drama.id} 
              drama={drama} 
              onMoveDrama={onMoveDrama}
              onUpdateRating={onUpdateRating}
              onDeleteDrama={onDeleteDrama}
              onEditDrama={onEditDrama}
            />
          ))}
        </div>
      )}
    </div>
  );
}
