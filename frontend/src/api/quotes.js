import axios from "axios";

const API_URL = "http://localhost:5000/api/quotes";
// const API_KEY = "5hpXZBYxwuy9LRJrzWBVBA==hLNTODQmSNiIvT98";

const fetchData = async (page = 1, limit = 4) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`, {
      // headers: { "X-Api-Key": API_KEY },
      contentType: "application/json",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data...", error);
    throw error;
  }
};

export default fetchData;
