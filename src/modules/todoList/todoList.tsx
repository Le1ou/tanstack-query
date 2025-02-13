import { TaskDto, todoListApi } from "./api";
import { useQuery } from "@tanstack/react-query";
import { useCreateTodo } from "./use-create-todo";
import { useDeleteTodo } from "./use-delete-todo";
// import { keepPreviousData } from "@tanstack/react-query";
// import { useState } from "react";

export function TodoList() {
  // const [page, setPage] = useState(1);
  // const [enabled, setEnable] = useState(false);

  // const { data, error, isLoading, isPlaceholderData } = useQuery({
  //   queryKey: ["tasks", "list", page],
  //   queryFn: (signal) => todoListApi.getTodoList( signal, { page }),
  //   placeholderData: keepPreviousData,
  //   enabled: enabled,
  // })

  // const { data, error, isLoading, isPlaceholderData } = useQuery(
  //   todoListApi.getTodoListQueryOptions({ page, enabled }),
  // );

  const { handleCreate, createIsPending } = useCreateTodo();
  const { handleDelete, delIsPending } = useDeleteTodo();

  const { data, error, isLoading, isPlaceholderData } = useQuery({
    ...todoListApi.getTodoListQueryOptions(),
    select: (data) => data.toReversed(),
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
      <form className="flex gap-2 mb-5" onSubmit={handleCreate}>
        <input className="rounded p-2 border border-teal-500" type="text" name="text" />
        <button
          disabled={createIsPending}
          className="rounded p-2 border border-teal-500 disabled:opacity-50"
        >
          Создать
        </button>
      </form>
      {/* <button className="cursor-pointer" onClick={() => setEnable((prevState) => !prevState)}>
        {enabled ? "Toogle disable" : "Toogle enable"}
      </button> */}
      <div className={"flex flex-col gap-4" + (isPlaceholderData ? " opacity-50" : "")}>
        {data.map((el: TaskDto) => (
          <div className="border border-slate-300 rounded p-3 flex justify-between" key={el.id}>
            {el.label}
            <button
              disabled={delIsPending}
              onClick={() => handleDelete(el.id)}
              className="text-rose-500 font-bold disabled:text-rose-300"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        {/* <button
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
        </button> */}
      </div>
    </div>
  );
}
