import React from "react";
import clsx from "clsx";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineCheck } from "react-icons/ai";

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
    <div className="flex justify-between py-4 border-b border-gray-300 group last-of-type:border-none">
      <label
        className={clsx(
          "relative flex h-5 w-5 rounded-md border border-gray-400 text-2xl text-primary",
          {
            "border-none": completed_at,
          }
        )}
        htmlFor={id}
      >
        {completed_at && <AiOutlineCheck className="absolute top-0" />}
      </label>
      <input
        className="hidden"
        type="checkbox"
        id={id}
        checked={!!completed_at}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setStatus(id, e.target.checked);
        }}
      />
      <span
        className={clsx([
          { "text-gray-500 line-through": completed_at },
          "flex-1 pl-3 text-left",
        ])}
      >
        {content}
      </span>
      <RiDeleteBinLine
        className="block text-2xl text-gray-500 cursor-pointer group-hover:block md:hidden"
        onClick={() => deleteItem(id)}
      />
    </div>
  );
};

export default TodoItem;
