import { useState } from "react";
import poweredBy from "./powered-by-vitawind-dark.png";
import Todo from "./pages/Todo";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="text-center selection:bg-green-900">
      <Todo />
    </div>
  );
}

export default App;
