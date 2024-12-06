import { motion } from "motion/react";

const QuotesCard = ({ id, author, category, quote }) => {
  return (
    <div className="flex justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-full h-40 bg-[#EAB69F] rounded-b-[36px] rounded-tr-3xl p-5 shadow-lg"
        key={id}
      >
        <h2>{author}</h2>
        <p className="text-sm">{quote}</p>
        <p>{category}</p>
      </motion.div>
    </div>
  );
};

export default QuotesCard;
