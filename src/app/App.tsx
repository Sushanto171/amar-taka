import ScrollToTop from "@/utils/ScrollToTop";
import { Outlet } from "react-router";
import CommonLayout from "./layout/CommonLayout";

function App() {
  return (
    <>
 
        <ScrollToTop />
        <CommonLayout>
          <Outlet />
        </CommonLayout>
  
    </>
  );
}

export default App;
