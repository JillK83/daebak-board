import { useState, useRef } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';

const columns = [
  { id: 'backlog', label: 'Backlog' },
  { id: 'watching', label: 'Currently Watching' },
  { id: 'completed', label: 'Completed' },
  { id: 'rewatch', label: 'Rewatch' }
];

export default function DramaCard({ drama, onMoveDrama, onUpdateRating, onDeleteDrama, onEditDrama }) {
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(drama.rating || 1);
  const [ratingInteracted, setRatingInteracted] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const ratingRef = useRef();
  const moveRef = useRef();
  const deleteRef = useRef();

  useClickOutside(ratingRef, () => {
    if (isRatingOpen) {
      setIsRatingOpen(false);
      if (ratingInteracted && ratingValue !== drama.rating) {
        onUpdateRating(drama.id, ratingValue);
      }
    }
  });

  useClickOutside(moveRef, () => {
    if (isMoveOpen) setIsMoveOpen(false);
  });

  useClickOutside(deleteRef, () => {
    if (isDeleteConfirmOpen) setIsDeleteConfirmOpen(false);
  });

  const handleRatingChange = (delta) => {
    setRatingInteracted(true);
    setRatingValue((prev) => {
      const newVal = prev + delta;
      if (newVal < 1) return 1;
      if (newVal > 10) return 10;
      return newVal;
    });
  };

  const cast = [drama.male_lead, drama.female_lead].filter(Boolean).join(' · ');
  const displayCast = cast || 'Top Cast';
  const platformsArr = Array.isArray(drama.platforms) ? drama.platforms : (drama.platforms ? [drama.platforms] : []);

  return (
    <div className="relative flex flex-row p-padding-card bg-card border border-border rounded-card gap-gap-card-inner group hover:border-border-hover hover:shadow-card-hover transition-all w-full text-left">
      {/* Edit / Remove Overlay */}
      <div className="absolute top-[10px] right-[10px] flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button 
          onClick={() => { console.log("Edit clicked"); if(onEditDrama) onEditDrama(drama.id); }}
          className="relative flex items-center justify-center w-action-btn-size h-action-btn-size rounded-action-btn border border-border bg-base group/btn hover:border-edit-hover cursor-pointer"
          title="Edit"
        >
          <i className="ti ti-pencil text-[12px] text-text-secondary group-hover/btn:text-edit-hover"></i>
        </button>
        <div ref={deleteRef} className="relative">
          {!isDeleteConfirmOpen ? (
            <button 
              onClick={() => setIsDeleteConfirmOpen(true)}
              className="flex items-center justify-center w-action-btn-size h-action-btn-size rounded-action-btn border border-border bg-base group/btn hover:border-remove-hover cursor-pointer"
              title="Remove"
            >
              <i className="ti ti-x text-[12px] text-text-secondary group-hover/btn:text-remove-hover"></i>
            </button>
          ) : (
            <button 
              onClick={() => onDeleteDrama(drama.id)}
              className="flex items-center justify-center px-2 h-action-btn-size rounded-action-btn border border-remove-hover bg-remove-hover text-card text-[10px] font-nunito hover:opacity-90 cursor-pointer"
            >
              Confirm?
            </button>
          )}
        </div>
      </div>

      {/* Thumbnail */}
      <div className="w-thumb-width h-thumb-height bg-thumb-bg rounded-[8px] flex items-center justify-center shrink-0">
         <svg width="48" height="60" viewBox="0 0 48 60" className="opacity-[0.32]">
           <circle cx="18" cy="28" r="5" fill="none" stroke="#8B7B6E" strokeWidth="1.5"/>
           <circle cx="30" cy="28" r="5" fill="none" stroke="#8B7B6E" strokeWidth="1.5"/>
           <line x1="18" y1="33" x2="16" y2="46" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
           <line x1="30" y1="33" x2="32" y2="46" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
           <line x1="18" y1="38" x2="25" y2="36" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
           <line x1="30" y1="38" x2="23" y2="36" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
         </svg>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0 pr-8">
        <h3 className="font-playfair font-semibold text-[14px] text-text-primary leading-tight mb-1 truncate">
          {drama.title}
        </h3>
        <p className="font-nunito text-[11px] text-text-ghost">
          {drama.year}{drama.totalEpisodes ? ` · ${drama.totalEpisodes} ep` : ''}
        </p>

        {drama.column === 'watching' && drama.totalEpisodes && (
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-progress-height bg-progress-track rounded-[2px]">
              <div 
                className="h-full bg-progress-fill rounded-[2px]" 
                style={{ width: `${(drama.currentEpisode || 0) / drama.totalEpisodes * 100}%` }}
              ></div>
            </div>
            <span className="font-nunito text-[10px] text-text-ghost whitespace-nowrap">
              Ep {drama.currentEpisode || 0} / {drama.totalEpisodes}
            </span>
          </div>
        )}

        <div className="h-[1px] bg-divider w-full my-[10px]"></div>

        <div ref={ratingRef} className="mb-2 inline-flex">
          {!isRatingOpen ? (
            <div 
              className="cursor-pointer inline-flex items-baseline gap-1"
              onClick={() => {
                setRatingValue(drama.rating || 1);
                setRatingInteracted(false);
                setIsRatingOpen(true);
              }}
            >
              {drama.rating ? (
                <>
                  <span className="font-playfair font-semibold text-[16px] text-rating-gold">{drama.rating}</span>
                  <span className="font-nunito text-[12px] text-text-ghost">/ 10</span>
                </>
              ) : (
                <span className="font-playfair font-semibold text-[15px] text-rating-unset hover:text-logo-accent transition-colors">— / 10</span>
              )}
            </div>
          ) : (
            <div className="inline-flex items-baseline gap-2">
              <button 
                onClick={() => handleRatingChange(-1)}
                className="w-stepper-btn-size h-stepper-btn-size bg-base border border-border rounded-stepper-btn flex items-center justify-center hover:bg-card hover:border-logo-accent cursor-pointer"
              >
                <span className="text-[12px] mt-[-1px] text-text-primary">−</span>
              </button>
              <span className="font-playfair font-semibold text-[18px] text-rating-gold min-w-[20px] text-center">{ratingValue}</span>
              <button 
                onClick={() => handleRatingChange(1)}
                className="w-stepper-btn-size h-stepper-btn-size bg-base border border-border rounded-stepper-btn flex items-center justify-center hover:bg-card hover:border-logo-accent cursor-pointer"
              >
                <span className="text-[12px] mt-[-1px] text-text-primary">+</span>
              </button>
              <span className="font-nunito text-[12px] text-text-ghost ml-1">/ 10</span>
            </div>
          )}
        </div>

        {displayCast && (
          <p className="font-nunito font-medium text-[11px] text-text-actors mb-2">
            {displayCast}
          </p>
        )}

        {platformsArr.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {platformsArr.map(p => {
              const pLower = p.toLowerCase();
              let border = 'border-l-border';
              let bg = 'bg-base';
              let text = 'text-text-primary';
              if (pLower === 'netflix') { border = 'border-l-[#E87C7C]'; bg = 'bg-[#FDF0EE]'; text = 'text-[#B94040]'; }
              if (pLower === 'viki') { border = 'border-l-[#A98FD4]'; bg = 'bg-[#F0EDF8]'; text = 'text-[#6148A8]'; }
              if (pLower === 'wavve') { border = 'border-l-[#5B9FE0]'; bg = 'bg-[#EEF4FD]'; text = 'text-[#1A5FA8]'; }

              return (
                <span key={p} className={`border-l-[3px] ${border} ${bg} ${text} rounded-[4px] px-2 py-[2px] font-nunito font-bold text-[10px]`}>
                  {p}
                </span>
              );
            })}
          </div>
        )}

        <div ref={moveRef} className="mt-auto">
          {!isMoveOpen ? (
            <div 
              className="inline-flex items-center gap-1 cursor-pointer group/move"
              onClick={() => setIsMoveOpen(true)}
            >
              <i className="ti ti-arrows-right-left text-[10px] text-[#C4B8AE] group-hover/move:text-[#9A8A7A] transition-colors"></i>
              <span className="font-nunito italic text-[10px] text-[#C4B8AE] group-hover/move:text-[#9A8A7A] transition-colors">move to</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-1">
              {columns.filter(c => c.id !== drama.column).map(c => {
                let hoverClasses = '';
                if (c.id === 'backlog') hoverClasses = 'hover:bg-backlog-bg hover:border-backlog-border hover:text-backlog-text';
                if (c.id === 'watching') hoverClasses = 'hover:bg-watching-bg hover:border-watching-border hover:text-watching-text';
                if (c.id === 'completed') hoverClasses = 'hover:bg-completed-bg hover:border-completed-border hover:text-completed-text';
                if (c.id === 'rewatch') hoverClasses = 'hover:bg-rewatch-bg hover:border-rewatch-border hover:text-rewatch-text';

                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      onMoveDrama(drama.id, c.id);
                      setIsMoveOpen(false);
                    }}
                    className={`h-[24px] px-[10px] rounded-move-pill bg-base border border-border text-text-secondary font-nunito font-semibold text-[10px] transition-colors cursor-pointer ${hoverClasses}`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
