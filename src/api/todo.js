import * as api from ".";

export const getTodoList = async () => await api.axiosGet("/api/todo", true);

export const getTodo = async (todoId) =>
  await api.axiosGet(`/api/todo/${todoId}`, true);

export const addTodo = async (todo) =>
  await api.axiosPost("/api/todo", true, todo);

export const updateTodo = async (todoId, todo) =>
  await api.axiosPost(`/api/todo/${todoId}`, true, todo);

export const deleteTodo = async (todoId) =>
  await api.axiosDelete(`/api/todo/${todoId}`, true);
