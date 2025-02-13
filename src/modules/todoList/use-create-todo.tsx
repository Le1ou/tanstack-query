import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { todoListApi } from "./api";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo,
    async onSettled() {
      await queryClient.invalidateQueries(todoListApi.getTodoListQueryOptions());
    },
  });

  const handleCreate = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const text = String(formData.get("text") ?? "");

    createTodoMutation.mutate({
      id: nanoid(),
      label: text,
      done: false,
      userId: "1",
    });

    evt.currentTarget.reset();
  };

  return { handleCreate, isPending: createTodoMutation.isPending };
}
