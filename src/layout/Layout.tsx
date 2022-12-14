import Header from "../components/Header";
import Loading from "../components/Loading";
import { useLoadingContext } from "../hooks/useLoadingContext";
import { Outlet } from "react-router-dom";
const Layout = () => {
  const { isShowLoading } = useLoadingContext();
  return (
    <div className="before:-z-1 relative min-h-screen w-screen overflow-hidden bg-white before:absolute before:top-0 before:left-0 before:h-0 before:w-0 before:border-r-[350vw] before:border-t-[70vh] before:border-t-primary before:border-b-transparent before:border-r-transparent before:border-l-transparent before:content-['']">
      <div className="relative">
        <Header />
        <Outlet />
      </div>
      {isShowLoading && <Loading />}
    </div>
  );
};

export default Layout;
