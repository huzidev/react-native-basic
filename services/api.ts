export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.TMDB_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjdkNWVlZTE0NzM3ZjNjMzJhZjdlN2U3MmY3ZmQxYSIsIm5iZiI6MTc0MzUxNTAzMS4zNDMwMDAyLCJzdWIiOiI2N2ViZWQ5N2Q3NmMxNTlhMTVmYjE5ZjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yOZv5a0eh7zQbWhCRikv3lzEcAmQqJ-BBoMrRUdJC_k`,
  },
};

export async function fetchMovies(query: string): Promise<Movie[]> {
  try {
    console.log("SW what is query", query);
    
    const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

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
