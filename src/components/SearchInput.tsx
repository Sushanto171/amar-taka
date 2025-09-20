import { Input } from "@/components/ui/input";
import { isNumberString } from "@/utils/isNumberString";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Dispatch, useEffect, useId, useState } from "react";

export default function SearchInput({
  placeholder = "Search phone, amount, reference, or types...",
  onSearch,
}: {
  placeholder?: string;
  onSearch?: Dispatch<React.SetStateAction<string | number>>;
}) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState<string | number>("");
  const [focused, setFocused] = useState(false);

  // Debounce logic (1s delay)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => clearTimeout(handler);
  }, [query]);

  // Call onSearch when debouncedQuery changes
  useEffect(() => {
    if (onSearch) {
      const isNum = isNumberString(debouncedQuery as string);
      if (isNum && debouncedQuery && typeof debouncedQuery === "string") {
        if (debouncedQuery.length < 10) {
          return onSearch(
            debouncedQuery.padEnd(debouncedQuery.length + 2, "0")
          );
        }
      }
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  return (
    <motion.div
      className="relative flex items-center"
      initial={{ width: "16rem" }} // ~w-56
      animate={{ width: focused ? "60%" : "16rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Input field */}
      <Input
        id={id}
        value={query}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setQuery(e.target.value)}
        className="peer ps-10 pe-10 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/30 focus:border-primary"
        placeholder={focused ? placeholder : "Search..."}
        type="search"
      />

      {/* Left search icon */}
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground/70 peer-disabled:opacity-50">
        <Search size={18} />
      </div>
    </motion.div>
  );
}
