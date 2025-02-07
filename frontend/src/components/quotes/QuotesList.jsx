import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import fetchData from "../../api/quotes";
import Card from "../common/Card";
import Loading from "../common/Loading";

const QuotesList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allQuotes, setAllQuotes] = useState([]); // Store all quotes

  const getData = async () => {
    try {
      setLoading(true);
      const result = await fetchData(page, 30); // Fetch 30 quotes per page
      setAllQuotes(result.quotes); // Store all 30 quotes
      setTotalPages(result.totalPages); // Set total pages based on calculation
    } catch (error) {
      setError("Error fetching data....");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  const currentQuotes = allQuotes.slice((page - 1) * 4, page * 4);

  if (loading && page == 1) return <Loading />;

  const main = {
    "& .Mui-selected": {
      bgcolor: "#F2CC8F",
    },
  };

  return (
    <div className="mt-10">
      {error && <p className="text-red-500">{error}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentQuotes.map((item, id) => (
          <Card key={id} author={item.author} quote={item.quote} />
        ))}
      </ul>

      <div className="flex justify-center mt-10 ">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          sx={main}
        />
      </div>
    </div>
  );
};

export default QuotesList;
