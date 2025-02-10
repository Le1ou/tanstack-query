const BASE_URL = "http://localhost:3000";

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
};

export const todoListApi = {
  getTodoList: ({ signal }: { signal: AbortSignal }, { page }: { page: number }) => {
    return fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=10`, { signal }).then(
      (res) => res.json() as Promise<PaginatedResult<TaskDto>>,
    );
  },
};
