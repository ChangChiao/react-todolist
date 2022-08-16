import { BASE_URL } from "../../config";
import service from "./axiosConfig";
import { getAuthorizationHeader } from "./header";

const TODO_PATH = `${BASE_URL}/todos`;

interface TodosResponse {
  todos: Todo[];
}

interface TodoResponse {
  todo: Todo;
}

interface TodoContent {
  content: "";
}

export const getTodos = () => {
  const headers = getAuthorizationHeader();
  let path = `${TODO_PATH}`;
  return service.get<{}, TodosResponse>(path, { headers });
};

export const addTodo = (param: TodoContent) => {
  const headers = getAuthorizationHeader();
  let path = `${TODO_PATH}`;
  return service.post<TodoContent, TodoResponse>(path, param, { headers });
};

export const reviseTodo = (id: string, param: TodoContent) => {
  const headers = getAuthorizationHeader();
  let path = `${TODO_PATH}/${id}`;
  return service.put<TodoContent, TodoResponse>(path, param, { headers });
};

export const deleteTodo = (id: string) => {
  const headers = getAuthorizationHeader();
  let path = `${TODO_PATH}/${id}`;
  return service.delete<{}, TodoResponse>(path, { headers });
};

export const toggle = (id: string) => {
  const headers = getAuthorizationHeader();
  let path = `${TODO_PATH}/${id}/toggle`;
  return service.patch<{}, TodoResponse>(path, { headers });
};
