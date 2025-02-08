import Title from "../components/common/Title";
import QuotesList from "../components/quotes/QuotesList";

const QuotesPage = () => {
  return (
    <div className="h-screen p-5 lg:p-0">
      <Title section_title="Daily quotes are here!" />
      <QuotesList />
    </div>
  );
};

export default QuotesPage;
