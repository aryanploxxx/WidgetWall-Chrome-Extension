import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const MarqueeItem = ({text, from, to }) => {
  return (
    <div className="flex MyGradient">
      <motion.div
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      >
        <span>{text}</span>
      </motion.div>
    </div>
  );
};

export default MarqueeItem;