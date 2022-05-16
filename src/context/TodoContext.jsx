import { createContext, useContext, useState } from "react";
import * as api from "../api";

const TodoContext = createContext(null);

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [lastUpdated, setLastUpdated] = useState(0);
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  const getTodosRequest = async () => {
    lastUpdated === 0 && setLoading(true);
    try {
      const { status, data } = await api.getTodoList();
      if (status !== 200) return;
      setTodos(data.habits);
      setLastUpdated(Date.now());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const syncTodosWithServer = () => {
    getTodosRequest();
  };

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, loading, syncTodosWithServer }}
    >
      {children}
    </TodoContext.Provider>
  );
};
