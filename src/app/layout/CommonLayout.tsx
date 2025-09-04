import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

type TProps = {
  children: ReactNode;
};

export default function CommonLayout({ children }: TProps) {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
