import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import fetchData from "../../api/quotes";
import QuotesCard from "./QuotesCard";

const QuotesList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getData = async () => {
    try {
      setLoading(true);
      const result = await fetchData(page, 4);
      setData(result.items);
      setTotalPages(result.totalPages);
    } catch (error) {
      setError("Error fetching data....");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  if (loading && page === 1) return <p>Loading...</p>;

  const main = {
    "& .Mui-selected": {
      bgcolor: "#B88E2F !Important",
    },
  };

  return (
    <div className="mt-10">
      {error && <p className="text-red-500">{error}</p>}{" "}
      <ul className="grid sm:grid-cols-2 gap-6">
        {data.map((item, id) => (
          <QuotesCard key={id} author={item.author} quote={item.quote} />
        ))}
      </ul>
      <div className="flex justify-center mt-10">
        <Pagination
          // color="primary"
          // className="text-red-700"
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
