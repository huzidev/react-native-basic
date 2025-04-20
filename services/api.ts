export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.TMDB_MOVIE_API_KEY,
};

export const GET_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_MOVIE_API_KEY}`,
  },
};

export async function fetchMovies(query: string): Promise<Movie[]> {
  try {
    console.log("SW what is query", query);

    const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, GET_OPTIONS);

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
  } catch (e) {
    console.log("Error fetching movies", e);
    return [];
  }
}

export async function fetchMovieDetails(id: string): Promise<MovieDetails | null> {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${id}?api_key=${TMDB_CONFIG.API_KEY}`,
        GET_OPTIONS
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    return await response.json();
  } catch (e) {
    console.log("Error fetching movie details", e);
    return null;
  }
}
