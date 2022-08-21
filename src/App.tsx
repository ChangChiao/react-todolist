import { HashRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Todo from "./pages/Todo";
import Sign from "./pages/Sign";
import NotFound from "./pages/NotFound";
import Layout from "./layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <RecoilRoot>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Todo />} />
          </Route>
          <Route path="/signin" element={<Sign />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
      <ToastContainer />
    </RecoilRoot>
  );
}

export default App;
