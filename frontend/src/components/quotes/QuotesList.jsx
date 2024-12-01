import { useEffect, useState } from "react";
import fetchData from "../../api/quotes";
import QuotesCard from "./QuotesCard";

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
    <div className="mt-10">
      <ul className="grid sm:grid-cols-3 gap-3">
        {/* {data.map((item) => (
          <li key={item.id}>{item.quote}</li>
        ))} */}
        {data.map((item) => (
          <QuotesCard key={item.id} author={item.author} quote={item.quote} />
        ))}
      </ul>
      {/* <QuotesCard /> */}
    </div>
  );
};

export default QuotesList;
