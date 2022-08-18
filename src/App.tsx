import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Todo from "./pages/Todo";
import Sign from "./pages/Sign";

function App() {
  const [count, setCount] = useState(0);

  return (
    <RecoilRoot>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/signIn" element={<Sign />} />
        </Routes>
      </HashRouter>
    </RecoilRoot>
  );
}

export default App;
