import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Todo from "./pages/Todo";
import Sign from "./pages/Sign";
function App() {
  const [count, setCount] = useState(0);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/signIn" element={<Sign />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
