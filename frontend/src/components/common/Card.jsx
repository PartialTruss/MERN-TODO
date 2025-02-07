const Card = ({ id, author, category, quote }) => {
  return (
    <>
      <div className="papper p-5">
        <h2>{author}</h2>
        <p>{quote}</p>
      </div>
    </>
  );
};

export default Card;
