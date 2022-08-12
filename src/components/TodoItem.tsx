import React from "react";

type TodoItemParam = {
  id: number;
  status: boolean;
  content: string;
  setStatus: (id: number, status: boolean) => void;
};

const TodoItem = ({ id, status, content, setStatus }: TodoItemParam) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={!!status}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setStatus(id, e.target.checked);
        }}
      />
      {{ content }}
    </div>
  );
};

export default TodoItem;
