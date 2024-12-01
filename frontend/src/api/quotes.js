import axios from "axios";

const API_URL = "http://localhost:3000/quotes";
// const API_KEY = "5hpXZBYxwuy9LRJrzWBVBA==hLNTODQmSNiIvT98";

const fetchData = async () => {
  try {
    const response = await axios.get(API_URL, {
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
