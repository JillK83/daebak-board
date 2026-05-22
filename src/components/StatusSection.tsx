
type StatusSectionProps = {
  id: 'backlog' | 'watching' | 'completed' | 'rewatch';
  label: string;
  icon: string;
  count: number;
  emptyStateText: string;
};

const EmptyStateIcon = ({ id }: { id: StatusSectionProps['id'] }) => {
  switch (id) {
    case 'backlog':
      return (
        <svg width="48" height="60" viewBox="0 0 48 60">
          <rect x="8" y="20" width="32" height="20" rx="3" fill="none" stroke="#8B7B6E" strokeWidth="1.5"/>
          <circle cx="16" cy="30" r="3" fill="none" stroke="#8B7B6E" strokeWidth="1.5"/>
          <circle cx="32" cy="30" r="3" fill="none" stroke="#8B7B6E" strokeWidth="1.5"/>
          <line x1="22" y1="30" x2="26" y2="30" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case 'watching':
      return (
        <svg width="48" height="60" viewBox="0 0 48 60">
          <circle cx="16" cy="24" r="5" fill="none" stroke="#8B7B6E" strokeWidth="1.5"/>
          <circle cx="32" cy="24" r="5" fill="none" stroke="#8B7B6E" strokeWidth="1.5"/>
          <line x1="16" y1="29" x2="14" y2="46" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="32" y1="29" x2="34" y2="46" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
          <rect x="21" y="32" width="6" height="8" rx="1" fill="none" stroke="#8B7B6E" strokeWidth="1.5"/>
          <line x1="16" y1="34" x2="21" y2="34" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="32" y1="34" x2="27" y2="34" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="23" y1="32" x2="21" y2="28" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="25" y1="32" x2="27" y2="28" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case 'completed':
      return (
        <svg width="48" height="60" viewBox="0 0 48 60">
          <circle cx="16" cy="26" r="5" fill="none" stroke="#8B7B6E" strokeWidth="1.5"/>
          <circle cx="32" cy="28" r="5" fill="none" stroke="#8B7B6E" strokeWidth="1.5"/>
          <line x1="16" y1="31" x2="16" y2="48" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="32" y1="33" x2="32" y2="48" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="16" y1="35" x2="22" y2="25" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="32" y1="36" x2="26" y2="34" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case 'rewatch':
      return (
        <svg width="48" height="60" viewBox="0 0 48 60">
          <path d="M 8 28 Q 24 16 40 28" fill="none" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="8" y1="28" x2="40" y2="28" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="24" y1="28" x2="24" y2="46" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M 24 46 Q 26 48 28 46" fill="none" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="18" cy="34" r="4" fill="none" stroke="#8B7B6E" strokeWidth="1.5"/>
          <circle cx="30" cy="34" r="4" fill="none" stroke="#8B7B6E" strokeWidth="1.5"/>
          <line x1="18" y1="38" x2="16" y2="48" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="30" y1="38" x2="32" y2="48" stroke="#8B7B6E" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    default:
      return null;
  }
};

export default function StatusSection({ id, label, icon, count, emptyStateText }: StatusSectionProps) {
  // Determine colors based on id using Tailwind custom config tokens
  const bgColors = {
    backlog: 'bg-backlog-bg border-backlog-border text-backlog-text',
    watching: 'bg-watching-bg border-watching-border text-watching-text',
    completed: 'bg-completed-bg border-completed-border text-completed-text',
    rewatch: 'bg-rewatch-bg border-rewatch-border text-rewatch-text',
  };

  const headerColors = bgColors[id];

  return (
    <div className="flex flex-col gap-3 min-w-[280px] w-full">
      {/* Header */}
      <div className={`flex flex-row items-center justify-between px-3 py-[9px] rounded-column-header ${headerColors.split(' ')[0]}`}>
        <div className="flex flex-row items-center gap-[6px]">
          <i className={`ti ${icon} text-[12px] ${headerColors.split(' ')[2]}`}></i>
          <span className={`font-nunito font-bold text-[9.5px] uppercase tracking-[0.12em] ${headerColors.split(' ')[2]}`}>
            {label}
          </span>
        </div>
        <div className={`flex items-center justify-center w-[18px] h-[18px] rounded-full border-[1.5px] ${headerColors.split(' ')[0]} ${headerColors.split(' ')[1]} ${headerColors.split(' ')[2]}`}>
          <span className="font-nunito font-bold text-[10px] leading-none mt-[1px]">{count}</span>
        </div>
      </div>

      {/* Add Show Button */}
      <button className="w-full bg-transparent border border-dashed border-border-dashed rounded-[8px] py-[7px] px-3 flex items-center justify-center gap-1 hover:border-logo-accent group transition-colors">
        <span className="font-nunito text-[11px] text-text-ghost group-hover:text-text-secondary transition-colors">+ Add show</span>
      </button>

      {/* Card List Area (empty state placeholder) */}
      <div className="flex-1 flex flex-col items-center justify-center bg-base border border-dashed border-border-dashed rounded-empty p-6 text-center gap-2">
        <div className="opacity-30 mb-2">
           <EmptyStateIcon id={id} />
        </div>
        <p className="font-playfair italic text-[11px] text-[#C4B8AE]">
          {emptyStateText}
        </p>
      </div>
    </div>
  );
}
