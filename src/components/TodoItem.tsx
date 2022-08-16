import React from "react";
import clsx from "clsx";
import { RiDeleteBinLine } from "react-icons/ri";
type TodoItemParam = Todo & {
  setStatus: (id: string, status: boolean) => void;
  deleteItem: (id: string) => void;
};

const TodoItem = ({
  id,
  completed_at,
  content,
  setStatus,
  deleteItem,
}: TodoItemParam) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={!!completed_at}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setStatus(id, e.target.checked);
        }}
      />
      <RiDeleteBinLine onClick={() => deleteItem(id)} />
      <span className={clsx({ "line-through": completed_at })}>
        {{ content }}
      </span>
    </div>
  );
};

export default TodoItem;
