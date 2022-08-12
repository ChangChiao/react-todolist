import { useState } from "react";
import { v1 as uuidv1 } from "uuid";
import TodoItem from "../components/TodoItem";
type TodoParam = {
  id: string;
  status: boolean;
  content: string;
};
const Todo = () => {
  const [todo, setTodo] = useState<TodoParam[]>([]);
  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      todo: { value: string };
    };
    setTodo((prev) => {
      return [
        ...prev,
        { content: formElements.todo.value, status: false, id: uuidv1() },
      ];
    });
  };
  const setStatus = (id: string, status: boolean) => {
    const updatedArr = todo.map((item) => {
      return item.id === id ? { ...item, status } : item;
    });
    setTodo(updatedArr);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="todo" type="text" />
        <input type="submit" value="送出" />
      </form>
      <div>
        {todo.map((item) => {
          <TodoItem setStatus={setStatus} {...item} />;
        })}
      </div>
    </div>
  );
};

export default Todo;
