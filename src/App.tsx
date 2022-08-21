import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Todo from "./pages/Todo";
import Sign from "./pages/Sign";
import Layout from "./layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [count, setCount] = useState(0);

  return (
    <RecoilRoot>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Todo />} />
          </Route>
          <Route path="/signIn" element={<Sign />} />
        </Routes>
      </HashRouter>
      <ToastContainer />
    </RecoilRoot>
  );
}

export default App;
