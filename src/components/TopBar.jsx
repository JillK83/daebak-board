

export default function TopBar() {
  return (
    <div className="flex flex-row items-center justify-between bg-base border-b border-border py-3 px-5">
      {/* Logo */}
      <div className="flex flex-row items-center cursor-default gap-0">
        <span className="font-playfair font-semibold text-[17px] text-text-primary leading-none">daebak</span>
        <span className="font-playfair font-semibold italic text-[17px] text-logo-accent leading-none">board</span>
      </div>

      {/* Search bar */}
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-md">
          <i className="ti ti-search absolute left-4 top-1/2 -translate-y-1/2 text-[12px] text-[#C4B8AE]"></i>
          <input
            type="text"
            placeholder="What do you want to watch?"
            className="w-full bg-card border border-border rounded-search py-[6px] pl-10 pr-4 font-nunito italic text-[12px] text-text-ghost outline-none focus:border-logo-accent"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-row items-center gap-[10px]">
        <div className="flex items-baseline gap-1">
          <span className="font-nunito font-bold text-[13px] text-text-primary">0</span>
          <span className="font-nunito text-[11px] text-text-secondary">tracked</span>
        </div>
        <div className="w-[1px] h-[14px] bg-[#DDD5CB]"></div>
        <div className="flex items-baseline gap-1">
          <span className="font-nunito font-bold text-[13px] text-text-primary">0</span>
          <span className="font-nunito text-[11px] text-text-secondary">active</span>
        </div>
        <div className="w-[1px] h-[14px] bg-[#DDD5CB]"></div>
        <div className="flex items-baseline gap-1">
          <span className="font-nunito font-bold text-[13px] text-text-primary">0</span>
          <span className="font-nunito text-[11px] text-text-secondary">done</span>
        </div>
      </div>
    </div>
  );
}
