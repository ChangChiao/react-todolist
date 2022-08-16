import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import TodoItem from "../components/TodoItem";
import { getTodos } from "../utils/api/todo";

const Todo = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [tab, setTab] = useState<number>(0);
  const tabList = [
    { title: "全部", status: 0 },
    { title: "待完成", status: 1 },
    { title: "已完成", status: 2 },
  ];
  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      todo: { value: string };
    };
    // setTodo((prev) => {
    //   return [
    //     ...prev,
    //     { content: formElements.todo.value, status: false, id: Date.now() },
    //   ];
    // });
  };
  const setStatus = (id: string, status: boolean) => {
    const updatedArr = todo.map((item) => {
      return item.id === id ? { ...item, status } : item;
    });
    setTodo(updatedArr);
  };
  const deleteItem = (id: string) => {
    const updatedArr = todo.filter((item) => {
      return item.id !== id;
    });
    setTodo(updatedArr);
  };

  const clearFinished = () => {
    const updatedArr = todo.filter((item) => {
      return !item.completed_at;
    });
    setTodo(updatedArr);
  };

  const filterTodo = useMemo(() => {
    if (tab === 1) return todo.filter((item) => !item.completed_at);
    if (tab === 2) return todo.filter((item) => item.completed_at);
    return todo;
  }, [tab]);

  const todoLength = useMemo(() => {
    return todo.filter((item) => !item.completed_at)?.length;
  }, [todo]);

  useEffect(() => {
    (async () => {
      const res = await getTodos();
      setTodo(res.todos);
    })();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="todo" type="text" />
        <input type="submit" value="送出" />
      </form>
      <ul>
        {tabList.map(({ title, status }) => (
          <li
            className={clsx({ active: tab === status })}
            onClick={() => {
              setTab(status);
            }}
          >
            {title}
          </li>
        ))}
      </ul>
      <div>
        {filterTodo.map((item) => {
          <TodoItem deleteItem={deleteItem} setStatus={setStatus} {...item} />;
        })}
      </div>
      <ul className="flex justify-between">
        <li>{{ todoLength }}個待完成項目</li>
        <li onClick={clearFinished}>清除已完成項目</li>
      </ul>
    </div>
  );
};

export default Todo;
