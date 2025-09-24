import { useGetMeQuery } from "@/redux/features/user/user.api";
import ScrollToTop from "@/utils/ScrollToTop";
import { Outlet } from "react-router";
import CommonLayout from "./layout/CommonLayout";

function App() {
  const { isLoading } = useGetMeQuery(undefined);
  return (
    <>
      <ScrollToTop />
      <CommonLayout>{!isLoading && <Outlet />}</CommonLayout>
    </>
  );
}

export default App;
