import logoUrl from '../assets/528logo.png';
import heroBg from '../assets/hero-bg.jpg';

export default function LandingPage({ onEnterBoard }) {
  return (
    <div 
      className="w-screen h-screen relative flex items-center justify-center bg-[#160C05]"
      style={{ overflow: 'hidden' }}
    >


      {/* Ken Burns Background Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transformOrigin: 'center center',
          animation: 'kenBurns 22s ease-in-out infinite alternate',
          zIndex: 0
        }}
      />

      {/* Dark Overlay (rgba 22,12,5 at 0.62 opacity) */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(22, 12, 5, 0.62)',
          zIndex: 1
        }}
      />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Logo and Tagline Stacked with Backing Glow */}
        <div 
          className="relative flex flex-col items-center mb-8"
          style={{
            animation: 'fadeUp 2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            animationDelay: '0.3s',
            opacity: 0,
            zIndex: 2
          }}
        >
          {/* Radial Light Bloom Glow (z-index 1) */}
          <div 
            style={{
              position: 'absolute',
              width: '500px',
              height: '300px',
              background: 'radial-gradient(ellipse at center, rgba(245, 236, 216, 0.32) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 1,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Logo Content (z-index 2) */}
          <div className="relative z-10 flex flex-col items-center">
            <img
              src={logoUrl}
              alt="Daebak Board logo"
              style={{
                height: '120px',
                objectFit: 'contain'
              }}
            />
            <p className="font-nunito italic text-[16px] text-[#DDD5CB] tracking-widest mt-3 opacity-75">
              your dramas, your pace
            </p>
          </div>
        </div>

        {/* Enter Board Button */}
        <button
          onClick={onEnterBoard}
          className="px-8 py-3.5 bg-[#E8845A] text-white font-nunito font-semibold text-[15px] rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-[1.04] cursor-pointer"
          style={{
            animation: 'fadeUp 2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            animationDelay: '1.2s',
            opacity: 0,
            boxShadow: '0 8px 30px rgba(232, 132, 90, 0.45)',
            zIndex: 2
          }}
        >
          <span>open my board</span>
          <i className="ti ti-arrow-right text-[14px] mt-[1px]"></i>
        </button>
      </div>
    </div>
  );
}
