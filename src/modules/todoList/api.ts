import { queryOptions } from "@tanstack/react-query";
// import { keepPreviousData } from "@tanstack/react-query";
import { jsonInstance } from "../../shared/api/api-instance";
// import { BASE_URL } from "../../shared/api/api-instance";

export type PaginatedResult<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
};

export type TaskDto = {
  id: string;
  label: string;
  done: boolean;
  userId: string;
};

export const todoListApi = {
  // getTodoList: ({ signal }: { signal: AbortSignal }, { page }: { page: number }) => {
  //   return fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=10`, { signal }).then(
  //     (res) => res.json() as Promise<PaginatedResult<TaskDto>>,
  //   );
  // },

  getTodoListQueryOptions: () => {
    return queryOptions({
      queryKey: ["tasks", "list"],
      queryFn: () => jsonInstance("/tasks"),
    });
  },

  // getTodoListPageQueryOptions: ({ page, enabled }: { page: number; enabled: boolean }) => {
  //   return queryOptions({
  //     queryKey: ["tasks", "list", page],
  //     queryFn: () => jsonInstance(`/tasks?_page=${page}&_per_page=10`),
  //     // placeholderData: keepPreviousData,
  //     // enabled: enabled,
  //   });
  // },

  createTodo(data: TaskDto) {
    return jsonInstance(`/tasks`, {
      method: "POST",
      json: data,
    });
  },
  updateTodo(id: string, data: TaskDto) {
    return jsonInstance(`/tasks/${id}`, {
      method: "PATCH",
      json: data,
    });
  },
  deleteTodo(id: string) {
    return (
      jsonInstance(`/tasks/${id}`),
      {
        method: "DELETE",
      }
    );
  },
};
