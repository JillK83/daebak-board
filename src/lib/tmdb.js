const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w300';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function searchShows(query) {
  const res = await fetch(
    `${TMDB_BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`
  );
  if (!res.ok) throw new Error('TMDB search failed');
  const data = await res.json();
  return data.results.slice(0, 6).map(show => ({
    tmdbId: show.id,
    title: show.name,
    originalTitle: show.original_name,
    year: show.first_air_date ? show.first_air_date.slice(0, 4) : null,
    posterUrl: show.poster_path ? `${TMDB_IMAGE_BASE}${show.poster_path}` : null,
  }));
}

export async function getShowBundle(tmdbId) {
  const [detailsRes, creditsRes, providersRes] = await Promise.all([
    fetch(`${TMDB_BASE_URL}/tv/${tmdbId}?api_key=${API_KEY}&language=en-US`),
    fetch(`${TMDB_BASE_URL}/tv/${tmdbId}/credits?api_key=${API_KEY}&language=en-US`),
    fetch(`${TMDB_BASE_URL}/tv/${tmdbId}/watch/providers?api_key=${API_KEY}`),
  ]);
  if (!detailsRes.ok) throw new Error('TMDB details fetch failed');
  const details = await detailsRes.json();
  const credits = creditsRes.ok ? await creditsRes.json() : { cast: [] };
  const providers = providersRes.ok ? await providersRes.json() : { results: {} };
  return normalizeShowBundle(details, credits, providers);
}

function normalizeShowBundle(details, credits, providers) {
  const cast = credits.cast || [];
  const usFlatrate = providers.results?.US?.flatrate || [];

  const featuredMaleCast = cast.find(m => m.gender === 2)?.name || '';
  const featuredFemaleCast = cast.find(m => m.gender === 1)?.name || '';
  const topCast = cast.slice(0, 2).map(m => m.name).join(', ');
  const rawPlatforms = usFlatrate
    .map(p => p.provider_name)
    .filter(name => !name.toLowerCase().includes('with'));

  const platforms = rawPlatforms
    .filter(name => !rawPlatforms.some(
      other => other !== name && name.toLowerCase().includes(other.toLowerCase())
    ))
    .join(', ');

  return {
    tmdbId: details.id,
    title: details.name || '',
    originalTitle: details.original_name || '',
    year: details.first_air_date ? parseInt(details.first_air_date.slice(0, 4)) : null,
    posterUrl: details.poster_path ? `${TMDB_IMAGE_BASE}${details.poster_path}` : null,
    featuredMaleCast,
    featuredFemaleCast,
    topCast,
    platforms,
  };
}
