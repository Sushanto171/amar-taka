import { motion } from "framer-motion";

export default function HeroProgressBar() {
  return (
    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
      <motion.div
        className="bg-primary h-full"
        initial={{ width: 0 }}
        animate={{ width: "70%" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </div>
  );
}
