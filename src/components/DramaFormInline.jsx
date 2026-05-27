import { useState } from 'react';
import { searchShows, getShowBundle } from '../lib/tmdb';

export default function DramaFormInline({ onSave, onCancel, initialData, allDramas = [] }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    release_year: initialData?.year || '',
    total_episodes: initialData?.totalEpisodes || '',
    current_episode: initialData?.currentEpisode || initialData?.current_episode || '',
    featured_male_cast: initialData?.male_lead || '',
    featured_female_cast: initialData?.female_lead || '',
    poster_url: initialData?.poster_url || '',
    platforms: initialData?.platforms || [],
    tmdb_id: initialData?.tmdb_id || null,
    source: initialData?.source || 'manual',
  });

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isEnriching, setIsEnriching] = useState(false);
  const [inlineError, setInlineError] = useState('');

  async function handleTmdbSearch() {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setInlineError('');
    try {
      const results = await searchShows(searchQuery);
      setSearchResults(results);
    } catch (err) {
      setInlineError('TMDB search failed. You can still add the show manually.');
    } finally {
      setIsSearching(false);
    }
  }

  async function handleSelectResult(tmdbId) {
    setIsEnriching(true);
    setInlineError('');
    try {
      const bundle = await getShowBundle(tmdbId);
      
      let parsedPlatforms = [];
      if (bundle.platforms) {
        if (typeof bundle.platforms === 'string') {
          parsedPlatforms = bundle.platforms.split(',').map(s => s.trim());
        } else if (Array.isArray(bundle.platforms)) {
          parsedPlatforms = bundle.platforms;
        }
      }

      setFormData(prev => ({
        ...prev,
        title: bundle.title,
        release_year: bundle.year || '',
        featured_male_cast: bundle.featuredMaleCast,
        featured_female_cast: bundle.featuredFemaleCast,
        top_cast: bundle.topCast,
        poster_url: bundle.posterUrl || '',
        platforms: parsedPlatforms,
        tmdb_id: bundle.tmdbId,
        source: 'tmdb',
      }));
      setSearchResults([]);
      setSearchQuery('');
      setIsSearchActive(false);
    } catch (err) {
      setInlineError('Failed to fetch show details. Try again or add manually.');
    } finally {
      setIsEnriching(false);
    }
  }

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

    if (formData.tmdb_id && allDramas?.some(d => d.tmdb_id === formData.tmdb_id)) {
      setInlineError('This show is already on your board.');
      return;
    }

    const payload = {
      title: formData.title.trim(),
      release_year: formData.release_year ? parseInt(formData.release_year, 10) : null,
      total_episodes: formData.total_episodes ? parseInt(formData.total_episodes, 10) : null,
      current_episode: formData.current_episode ? parseInt(formData.current_episode, 10) : null,
      featured_male_cast: formData.featured_male_cast.trim() || null,
      featured_female_cast: formData.featured_female_cast.trim() || null,
      poster_url: formData.poster_url.trim() || null,
      platforms: formData.platforms.join(', ') || null,
      tmdb_id: formData.tmdb_id || null,
      source: formData.source || 'manual',
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
      
      <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-3">
        {/* TMDB Search UI for New Shows only */}
        {!initialData && (
          <div className="flex flex-col gap-2 mb-1">
            {!isSearchActive ? (
              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchActive(true);
                    setInlineError('');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C4785A] bg-[#FDF0EE] text-[#C4785A] font-bold text-[11px] hover:bg-[#FBE6E2] transition-colors cursor-pointer"
                >
                  <i className="ti ti-search text-[12px]"></i>
                  Search TMDB
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5 relative">
                <div className="flex items-center justify-between">
                  <span className="font-nunito text-[11px] text-[#7A726B] uppercase tracking-wider">
                    Search TMDB
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchActive(false);
                      setSearchQuery('');
                      setSearchResults([]);
                      setInlineError('');
                    }}
                    className="text-[11px] text-[#9C8F86] hover:text-text-primary transition-colors cursor-pointer"
                  >
                    Cancel Search
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    name="tmdbSearchQuery"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    disabled={isEnriching}
                    autoComplete="off"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleTmdbSearch();
                      }
                    }}
                    placeholder="Search TV Show title..."
                    className="flex-1 border border-border rounded-[4px] px-2 py-1.5 text-[12px] outline-none focus:border-logo-accent bg-base placeholder-[#9C8F86] disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={handleTmdbSearch}
                    disabled={isSearching || isEnriching || !searchQuery.trim()}
                    className="px-3 py-1.5 rounded-[4px] font-bold text-[11px] text-card bg-[#C4785A] hover:bg-opacity-90 disabled:opacity-50 transition-opacity cursor-pointer flex items-center justify-center min-w-[64px]"
                  >
                    {isSearching ? <i className="ti ti-loader animate-spin text-[12px]" /> : 'Search'}
                  </button>
                </div>

                {isSearching && (
                  <div className="text-[11px] text-[#7A726B] italic flex items-center gap-1.5 mt-1 px-1">
                    <i className="ti ti-loader animate-spin text-[12px]" />
                    Searching TMDB...
                  </div>
                )}

                {isEnriching && (
                  <div className="text-[11px] text-[#C4785A] font-semibold flex items-center gap-1.5 mt-1 px-1 animate-pulse">
                    <i className="ti ti-loader-2 animate-spin text-[12px]" />
                    Enriching show data...
                  </div>
                )}

                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 z-50 max-h-[220px] overflow-y-auto bg-card border border-border rounded-[8px] shadow-card-hover flex flex-col p-1.5 gap-1">
                    {searchResults.map((result) => (
                      <div
                        key={result.tmdbId}
                        onClick={() => !isEnriching && handleSelectResult(result.tmdbId)}
                        className="flex items-center gap-2.5 p-1.5 rounded-[6px] hover:bg-base transition-colors cursor-pointer group"
                      >
                        <div className="w-[30px] h-[45px] bg-[#EDE6DF] rounded-[4px] overflow-hidden shrink-0 flex items-center justify-center">
                          {result.posterUrl ? (
                            <img
                              src={result.posterUrl}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <i className="ti ti-photo text-[14px] text-text-ghost" />
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-nunito font-bold text-[12px] text-text-primary truncate group-hover:text-logo-accent transition-colors">
                            {result.title}
                          </span>
                          <span className="font-nunito text-[10px] text-[#9C8F86]">
                            {result.year || 'N/A'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="font-nunito text-[11px] text-[#7A726B] uppercase tracking-wider">
            Title
          </label>
          <input 
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            autoComplete="off"
            className="border border-border rounded-[4px] px-2 py-1.5 text-[12px] outline-none focus:border-logo-accent bg-base placeholder-[#9C8F86]"
            placeholder="Show title"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-nunito text-[11px] text-[#7A726B] uppercase tracking-wider">
            Year
          </label>
          <input 
            type="number"
            name="release_year"
            value={formData.release_year}
            onChange={handleChange}
            autoComplete="off"
            className="w-full border border-border rounded-[4px] px-2 py-1.5 text-[12px] outline-none focus:border-logo-accent bg-base placeholder-[#9C8F86]"
            placeholder="e.g. 2024"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col gap-1 flex-1">
            <label className="font-nunito text-[11px] text-[#7A726B] uppercase tracking-wider">
              Current Ep
            </label>
            <input 
              type="number"
              name="current_episode"
              value={formData.current_episode}
              onChange={handleChange}
              autoComplete="off"
              className="w-full border border-border rounded-[4px] px-2 py-1.5 text-[12px] outline-none focus:border-logo-accent bg-base placeholder-[#9C8F86]"
              placeholder="e.g. 8"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="font-nunito text-[11px] text-[#7A726B] uppercase tracking-wider">
              Total Ep
            </label>
            <input 
              type="number"
              name="total_episodes"
              value={formData.total_episodes}
              onChange={handleChange}
              autoComplete="off"
              className="w-full border border-border rounded-[4px] px-2 py-1.5 text-[12px] outline-none focus:border-logo-accent bg-base placeholder-[#9C8F86]"
              placeholder="e.g. 16"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col gap-1 flex-1">
            <label className="font-nunito text-[11px] text-[#7A726B] uppercase tracking-wider">
              Male Lead
            </label>
            <input 
              name="featured_male_cast"
              value={formData.featured_male_cast}
              onChange={handleChange}
              autoComplete="off"
              className="w-full border border-border rounded-[4px] px-2 py-1.5 text-[12px] outline-none focus:border-logo-accent bg-base placeholder-[#9C8F86]"
              placeholder="e.g. Song Kang"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="font-nunito text-[11px] text-[#7A726B] uppercase tracking-wider">
              Female Lead
            </label>
            <input 
              name="featured_female_cast"
              value={formData.featured_female_cast}
              onChange={handleChange}
              autoComplete="off"
              className="w-full border border-border rounded-[4px] px-2 py-1.5 text-[12px] outline-none focus:border-logo-accent bg-base placeholder-[#9C8F86]"
              placeholder="e.g. Kim Yoo-jung"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Platforms</span>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {['Netflix', 'Viki', 'Wavve', 'Hulu', 'Disney+', 'Prime Video'].map(platform => (
              <label key={platform} className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.platforms.includes(platform)}
                  onChange={() => handlePlatformToggle(platform)}
                  autoComplete="off"
                  className="w-[13px] h-[13px] accent-[#C4785A] cursor-pointer"
                />
                <span className="font-nunito text-[12px] text-[#5E5752]">{platform}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-nunito text-[11px] text-[#7A726B] uppercase tracking-wider">
            Poster URL
          </label>
          <input 
            name="poster_url"
            value={formData.poster_url}
            onChange={handleChange}
            autoComplete="off"
            className="border border-border rounded-[4px] px-2 py-1.5 text-[12px] outline-none focus:border-logo-accent bg-base placeholder-[#9C8F86]"
            placeholder="https://..."
          />
        </div>

        {inlineError && (
          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#FDF0EE] border border-[#FBE6E2] rounded-[6px] text-[#B94040] text-[11px] font-semibold leading-snug">
            <i className="ti ti-alert-circle text-[13px] shrink-0"></i>
            <span>{inlineError}</span>
          </div>
        )}

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
