import Title from "../components/common/Title";
import QuotesList from "../components/quotes/QuotesList";

const QuotesPage = () => {
  return (
    <div>
      <Title section_title="Daily quotes are here!" />
      <QuotesList />
    </div>
  );
};

export default QuotesPage;
