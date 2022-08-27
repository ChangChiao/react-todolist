import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useLoadingContext } from "../hooks/useLoadingContext";
import { useNavigate } from "react-router-dom";
import TodoItem from "../components/TodoItem";
import {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  userCheck,
} from "../utils/api";
import { AiOutlinePlus } from "react-icons/ai";
const testData = [
  { id: "1661089578600", content: "打東東", completed_at: null },
  {
    id: "1661089578601",
    content: "just dance",
    completed_at: "1661089578602",
  },
];
const Todo = () => {
  const { setLoading } = useLoadingContext();
  const navigate = useNavigate();
  const todoInput = useRef<HTMLInputElement | null>(null);
  const [todo, setTodo] = useState<Todo[]>([]);
  const [tab, setTab] = useState<number>(0);
  const tabList = [
    { title: "全部", status: 0 },
    { title: "待完成", status: 1 },
    { title: "已完成", status: 2 },
  ];

  const getList = async () => {
    try {
      setLoading(true);
      const res = await getTodos();
      setLoading(false);
      setTodo(res.todos);
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      todo: { value: string };
    };
    await addTodo({
      todo: {
        content: formElements.todo.value,
      },
    });
    if (todoInput.current) todoInput.current.value = "";
    getList();
    // setTodo((prev) => {
    //   return [
    //     ...prev,
    //     { content: formElements.todo.value, status: false, id: Date.now() },
    //   ];
    // });
  };
  const setStatus = async (id: string, status: boolean) => {
    // const updatedArr = todo.map((item) => {
    //   return item.id === id ? { ...item, status } : item;
    // });
    // setTodo(updatedArr);
    console.log("status", status);
    setLoading(true);
    const res = await toggleTodo(id);
    const { completed_at } = res;
    setLoading(false);
    updateItem(id, "completed_at", completed_at);
    // getList();
  };
  const deleteItem = async (id: string) => {
    // const updatedArr = todo.filter((item) => {
    //   return item.id !== id;
    // });
    // setTodo(updatedArr);
    setLoading(true);
    await deleteTodo(id);
    setLoading(false);
    getList();
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
  }, [tab, todo]);

  console.log("filterTodo", filterTodo);

  const todoLength = useMemo(() => {
    return todo.filter((item) => !item.completed_at)?.length || 0;
  }, [todo]);

  const checkAuth = async () => {
    try {
      await userCheck();
    } catch (error) {
      navigate("/signin");
    }
  };

  const updateItem = (id: string, key: string, value: string | null) => {
    const updatedArr = todo.map((item) => {
      return item.id === id ? { ...item, [key]: value } : item;
    });
    setTodo(updatedArr);
  };

  useEffect(() => {
    (async () => {
      await checkAuth();
    })();
    getList();
  }, []);
  return (
    <div className="mx-auto mt-10 w-3/5 min-w-[500px]">
      <form
        className="flex items-center justify-between p-2 bg-white rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <input
          ref={todoInput}
          className="h-8 w-[calc(100%-50px)]"
          name="todo"
          type="text"
        />
        {/* <input type="submit" value="送出" /> */}
        <button
          className="flex items-center justify-center w-10 h-10 text-2xl text-white bg-black rounded-xl"
          type="submit"
        >
          <AiOutlinePlus />
        </button>
      </form>
      <main className="py-8 mt-6 bg-white rounded-lg shadow-lg">
        <ul className="flex justify-between pt-4">
          {tabList.map(({ title, status }) => (
            <li
              className={clsx(
                "w-[33.3%] cursor-pointer border-b-2  pb-4 text-center",
                tab === status
                  ? "border-b-gray-400 text-gray-900"
                  : "border-b-gray-200 text-gray-500"
              )}
              key={status}
              onClick={() => {
                setTab(status);
              }}
            >
              {title}
            </li>
          ))}
        </ul>
        <div className="p-4">
          {filterTodo.map((item) => (
            <TodoItem
              key={item.id}
              deleteItem={deleteItem}
              setStatus={setStatus}
              {...item}
            />
          ))}
        </div>
        <ul className="flex justify-between px-4">
          <li>
            <span className="px-1">{todoLength}</span>個待完成項目
          </li>
          <li className="text-gray-400 " onClick={clearFinished}>
            清除已完成項目
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Todo;
