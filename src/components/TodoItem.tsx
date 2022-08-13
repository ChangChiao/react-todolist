import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
type TodoItemParam = {
  id: number;
  status: boolean;
  content: string;
  setStatus: (id: number, status: boolean) => void;
  deleteItem: (id: number) => void;
};

const TodoItem = ({
  id,
  status,
  content,
  setStatus,
  deleteItem,
}: TodoItemParam) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={!!status}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setStatus(id, e.target.checked);
        }}
      />
      <RiDeleteBinLine onClick={() => deleteItem(id)} />
      {{ content }}
    </div>
  );
};

export default TodoItem;
