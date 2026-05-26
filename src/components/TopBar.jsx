import logoUrl from '../assets/528logo.png';

const IS_DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

export default function TopBar({ searchQuery, onSearch }) {
  return (
    <>
      {IS_DEMO_MODE && (
        <div className="bg-orange-100 border-b border-orange-300 text-orange-800 text-center text-sm py-2 font-nunito font-semibold">
          Demo mode: changes are temporary and reset on refresh.
        </div>
      )}
      <div className="flex flex-row items-center justify-between bg-base border-b border-border py-4 px-8">
        {/* Logo */}
        <div className="flex flex-col items-start">
          <img
            src={logoUrl}
            alt="Daebak Board"
            style={{
              height: '72px',
              objectFit: 'contain'
            }}
          />
          <p className="font-nunito italic text-[11px] text-text-secondary tracking-wide mt-[-4px] pl-1">
            your dramas, your pace
          </p>
        </div>

        {/* Search bar */}
        <div className="flex-1 flex justify-center px-4">
          <div className="relative w-full max-w-md">
            <i className="ti ti-search absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-[#9C8F86]"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={e => onSearch(e.target.value)}
              placeholder="Search your board..."
              className="w-full bg-card border border-border rounded-xl py-[10px] pl-10 pr-4 font-nunito text-[13px] text-text-primary placeholder-[#9C8F86] outline-none focus:border-logo-accent"
            />
          </div>
        </div>
      </div>
    </>
  );
}
