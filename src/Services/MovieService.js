import axios from 'axios';
import { appLevelConstants } from '../AppLevelConstants';

// Create an Axios instance with the base URL
console.log("tbdb",process.env)
const TMDB_AUTH_TOKEN = process.env.REACT_APP_TMDB_AUTH_TOKEN;
console.log("tbdb",TMDB_AUTH_TOKEN)
const apiService = axios.create({
    baseURL: appLevelConstants.TMDB_BASE_URL,
    headers: {
        'Authorization': `Bearer ${TMDB_AUTH_TOKEN}`,
        'Content-Type': 'application/json'
  }
});

const movieService = {
  async fetchMovies() {
    try {
      const response = await axios.get("/data.json");
      return response.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  },
  async fetchTMDBMovies(reqObj) {
    try {
      const response = await apiService.get("/discover/movie", {
        params: {
          include_adult: false,
          include_video: false,
          language: "en-US",
          page: reqObj.page,
          sort_by: "popularity.desc",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching TMDB movies:", error);
      return [];
    }
  },
  async searchMovies(reqObj) {
    try {
      const response = await apiService.get("/search/movie", {
        params: {
          query: reqObj.searchTitle,
          include_adult: false,
          language: "en-US",
          page: 1,
        },
      });
      return response.data;
    } catch (e) {
      console.error("Error seraching movies",e);
      return {
        results: []
      };
    }
  },
};

export default movieService;
