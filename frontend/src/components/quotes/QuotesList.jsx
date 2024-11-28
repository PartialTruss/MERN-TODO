import { useEffect, useState } from "react";
import fetchData from "../../api/quotes";

const QuotesList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (error) {
        setError("Error fetching data....");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuotesList;
