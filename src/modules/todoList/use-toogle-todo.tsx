import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskDto, todoListApi } from "./api";

export function useToogleTodo() {
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation({
    mutationFn: todoListApi.updateTodo,

    onMutate: async (newTodo) => {
      await queryClient.cancelQueries(todoListApi.getTodoListQueryOptions());

      const prevTodos = queryClient.getQueryData(todoListApi.getTodoListQueryOptions().queryKey);

      queryClient.setQueryData(todoListApi.getTodoListQueryOptions().queryKey, (old) =>
        old?.map((el: TaskDto) => (el.id === newTodo.id ? { ...el, ...newTodo } : el)),
      );

      return { prevTodos };
    },

    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(todoListApi.getTodoListQueryOptions().queryKey, context.prevTodos);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(todoListApi.getTodoListQueryOptions());
    },
  });

  const toogleTodo = (id: string, done: boolean) => {
    const todos = queryClient.getQueryData<TaskDto[]>(
      todoListApi.getTodoListQueryOptions().queryKey,
    );
    const currentTodo = todos?.find((todo) => todo.id === id);
    if (!currentTodo) return;

    updateTodoMutation.mutate({
      ...currentTodo,
      done: !done,
    });
  };

  return { toogleTodo };
}
