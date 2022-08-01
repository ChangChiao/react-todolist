import { useState } from "react";
import logo from "./logo.svg";
import poweredBy from "./powered-by-vitawind-dark.png";
import TodoItem from "./components/TodoItem";
import { AiOutlinePlus } from "react-icons/ai";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="text-center selection:bg-green-900">
      <TodoItem />
      <AiOutlinePlus />
    </div>
  );
}

export default App;
