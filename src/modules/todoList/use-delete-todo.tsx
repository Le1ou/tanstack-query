import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "./api";
import { TaskDto } from "./api";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,
    async onSettled() {
      await queryClient.invalidateQueries(todoListApi.getTodoListQueryOptions());
    },
    async onSuccess(_, deleteID) {
      const todos = queryClient.getQueryData(todoListApi.getTodoListQueryOptions().queryKey);
      if (todos) {
        queryClient.setQueryData(
          todoListApi.getTodoListQueryOptions().queryKey,
          todos.filter((el: TaskDto) => el.id !== deleteID),
        );
      }
    },
  });

  deleteTodoMutation.variables;

  return {
    handleDelete: deleteTodoMutation.mutate,
    getisPending: (id: string) =>
      deleteTodoMutation.isPending && deleteTodoMutation.variables === id,
  };
}
