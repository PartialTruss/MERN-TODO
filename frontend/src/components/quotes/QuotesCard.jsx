const QuotesCard = ({ id, author, category, quote }) => {
  return (
    <div className="flex justify-center">
      <div
        className="w-full h-40 bg-[#EAB69F] rounded-b-[36px] rounded-tr-3xl p-5 shadow-lg"
        key={id}
      >
        <h2>{author}</h2>
        <p className="text-sm">{quote}</p>
        <p>{category}</p>
      </div>
    </div>
  );
};

export default QuotesCard;
