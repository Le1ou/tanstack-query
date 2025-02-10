import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";
import { useState } from "react";

export function TodoList() {
  const [page, setPage] = useState(1);
  const [enabled, setEnable] = useState(false);

  const { data, error, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["tasks", "list", page],
    queryFn: ({ signal }) => todoListApi.getTodoList({ signal }, { page }),
    placeholderData: keepPreviousData,
    enabled: enabled,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="p-5 mx-auto max-w-[1200px]">
      <h1 className="text-3xl font-bold underline mb-5">Todo List</h1>
      <button className="cursor-pointer" onClick={() => setEnable((prevState) => !prevState)}>
        Toggle enabled
      </button>
      <div className={"flex flex-col gap-4" + (isPlaceholderData ? " opacity-50" : "")}>
        {data &&
          data.data.map((el) => (
            <div className="border border-slate-300 rounded p-3" key={el.id}>
              {el.label}
            </div>
          ))}
      </div>
      <div className="flex gap-2 mt-4">
        <button
          className="p-3 rounded border border-teal-500 cursor-pointer"
          onClick={() => setPage((prevState) => Math.max(1, prevState - 1))}
        >
          Prev
        </button>
        <button
          className="p-3 rounded border border-teal-500 cursor-pointer"
          onClick={() => setPage((prevState) => Math.min(5, prevState + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
