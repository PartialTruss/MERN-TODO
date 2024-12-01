const QuotesCard = ({ id, author, category, quote }) => {
  return (
    <div
      className="w-full h-40 bg-[#EAB69F] rounded-b-3xl rounded-tr-3xl p-5"
      key={id}
    >
      <h2>{author}</h2>
      <p className="text-sm">{quote}</p>
      <p>{category}</p>
    </div>
  );
};

export default QuotesCard;
