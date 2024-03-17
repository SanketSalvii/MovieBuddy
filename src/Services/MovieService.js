// movieService.js

import axios from 'axios';

const movieService = {
    async fetchMovies() {
        try {
            const response = await axios.get('/data.json');
            return response.data;
        } catch (error) {
            console.error('Error fetching movies:', error);
            return [];
        }
    }
};

export default movieService;
