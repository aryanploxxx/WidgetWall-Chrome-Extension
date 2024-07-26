import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const MarqueeItem = ({text, from, to }) => {
  return (
    <div className="flex MyGradient">
      <motion.div
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="text-red-600"
      >
        <span>{text} • </span>
      </motion.div>
    </div>
  );
};

export default MarqueeItem;