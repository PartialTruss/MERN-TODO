import axios from "axios";

const API_URL = "https://dummyjson.com/quotes";

const fetchData = async (page = 1, limit = 30) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const totalPages = Math.ceil(limit);

    return {
      quotes: response.data.quotes,
      totalPages: totalPages,
    };
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export default fetchData;
