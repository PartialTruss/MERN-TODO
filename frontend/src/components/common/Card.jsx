import { motion } from "framer-motion";

const Card = ({ id, author, category, quote }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className="papper p-5 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-lg font-semibold">{author}</h2>
      <p>{quote}</p>
    </motion.div>
  );
};

export default Card;
