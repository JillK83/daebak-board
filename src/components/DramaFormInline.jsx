import { useState } from 'react';

export default function DramaFormInline({ onSave, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    release_year: initialData?.year || '',
    total_episodes: initialData?.totalEpisodes || '',
    featured_male_cast: initialData?.male_lead || '',
    featured_female_cast: initialData?.female_lead || '',
    poster_url: initialData?.poster_url || '',
    platforms: initialData?.platforms || []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlatformToggle = (platform) => {
    setFormData(prev => {
      const isSelected = prev.platforms.includes(platform);
      return {
        ...prev,
        platforms: isSelected
          ? prev.platforms.filter(p => p !== platform)
          : [...prev.platforms, platform]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const payload = {
      title: formData.title.trim(),
      release_year: formData.release_year ? parseInt(formData.release_year, 10) : null,
      total_episodes: formData.total_episodes ? parseInt(formData.total_episodes, 10) : null,
      featured_male_cast: formData.featured_male_cast.trim() || null,
      featured_female_cast: formData.featured_female_cast.trim() || null,
      poster_url: formData.poster_url.trim() || null,
      platforms: formData.platforms.join(', ') || null,
    };
    
    onSave(payload);
  };

  return (
    <div className="p-padding-card bg-card border border-logo-accent rounded-card shadow-card-hover w-full font-nunito flex flex-col gap-3">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-playfair font-semibold text-[14px] text-logo-accent">
          {initialData ? 'Edit Show' : 'Add New Show'}
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <input 
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-border rounded-[4px] px-2 py-1.5 text-[12px] outline-none focus:border-logo-accent bg-base"
            placeholder="Title *"
          />
        </div>

        <div className="flex gap-2">
          <input 
            type="number"
            name="release_year"
            value={formData.release_year}
            onChange={handleChange}
            className="flex-1 border border-border rounded-[4px] px-2 py-1.5 text-[12px] outline-none focus:border-logo-accent bg-base min-w-0"
            placeholder="Year"
          />
          <input 
            type="number"
            name="total_episodes"
            value={formData.total_episodes}
            onChange={handleChange}
            className="flex-1 border border-border rounded-[4px] px-2 py-1.5 text-[12px] outline-none focus:border-logo-accent bg-base min-w-0"
            placeholder="Total Ep"
          />
        </div>

        <div className="flex gap-2">
          <input 
            name="featured_male_cast"
            value={formData.featured_male_cast}
            onChange={handleChange}
            className="flex-1 border border-border rounded-[4px] px-2 py-1.5 text-[12px] outline-none focus:border-logo-accent bg-base min-w-0"
            placeholder="Male Lead"
          />
          <input 
            name="featured_female_cast"
            value={formData.featured_female_cast}
            onChange={handleChange}
            className="flex-1 border border-border rounded-[4px] px-2 py-1.5 text-[12px] outline-none focus:border-logo-accent bg-base min-w-0"
            placeholder="Female Lead"
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Platforms</span>
          <div className="flex flex-wrap gap-2">
            {['Netflix', 'Viki', 'Wavve'].map(p => (
              <label key={p} className="flex items-center gap-1 cursor-pointer group">
                <input 
                  type="checkbox"
                  checked={formData.platforms.includes(p)}
                  onChange={() => handlePlatformToggle(p)}
                  className="accent-logo-accent cursor-pointer w-3 h-3"
                />
                <span className="text-[11px] text-text-primary group-hover:text-logo-accent transition-colors">{p}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <input 
            name="poster_url"
            value={formData.poster_url}
            onChange={handleChange}
            className="border border-border rounded-[4px] px-2 py-1.5 text-[12px] outline-none focus:border-logo-accent bg-base"
            placeholder="Poster URL"
          />
        </div>

        <div className="mt-1 flex justify-end gap-2">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-3 py-1.5 rounded-[4px] font-bold text-[11px] text-text-secondary hover:bg-base border border-transparent transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={!formData.title.trim()}
            className="px-4 py-1.5 rounded-[4px] font-bold text-[11px] text-card bg-text-primary hover:bg-opacity-90 disabled:opacity-50 transition-opacity cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
