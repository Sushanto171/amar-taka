import { Loader } from "lucide-react";

export default function ButtonLoader({ spin = false }: { spin: boolean }) {
  return (
    <span className={`animate-spin ${spin ? "" : "hidden"}`}>
      <Loader />
    </span>
  );
}
