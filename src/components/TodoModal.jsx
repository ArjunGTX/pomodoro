import clsx from "clsx";
import { useState, useRef } from "react";
import { Button } from "./Button";
import { TextInput } from "./TextInput";
import * as api from "../api";
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "../util/constant";
import { useClickOutside } from "../hooks";
import { useTodo } from "../context";

export const TodoModal = ({ onClose, todo }) => {
  const { syncTodosWithServer } = useTodo();

  const modalRef = useRef(null);

  useClickOutside(modalRef, onClose);

  const [todoInputs, setTodoInputs] = useState(
    todo
      ? todo
      : {
          title: "",
          description: "",
          time: "",
          isComplete: false,
          labels: [],
        }
  );

  const createTodoRequest = async () => {
    try {
      const { status, data } = await api.addTodo(todoInputs);
      if (status !== 201) return;
      toast.success(toastSuccess.ADD_TODO);
      onClose();
      syncTodosWithServer();
    } catch (error) {
      toast.error(toastError.ADD_TODO);
    }
  };

  const updateTodoRequest = async () => {
    const { _id, ...todoData } = todoInputs;
    try {
      const { status, data } = await api.updateTodo(_id, todoData);
      if (status !== 200) return;
      syncTodosWithServer();
      toast.success(toastSuccess.UPDATE_TODO);
      onClose();
    } catch (error) {
      toast.error(toastError.UPDATE_TODO);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    todo ? updateTodoRequest() : createTodoRequest();
  };

  const handleInputChange = (e) =>
    setTodoInputs((inputs) => ({
      ...inputs,
      [e.target.id]: e.target.value,
    }));

  return (
    <form
      ref={modalRef}
      onSubmit={handleSubmit}
      className={clsx(
        "todo-modal fc-fs-fs p-xl shadow-light pos-fix z-400 br-sm bg-secondary-light"
      )}
    >
      <TextInput
        required
        id="title"
        placeholder="Task Title"
        className="mb-md"
        value={todoInputs.title}
        onChange={handleInputChange}
      />
      <textarea
        required
        value={todoInputs.description}
        onChange={handleInputChange}
        id="description"
        rows="3"
        className="mb-md br-sm bd-medium full-width txt-xs px-xl py-sm ofy-auto"
        placeholder="Task Description"
      ></textarea>
      <TextInput
        required
        value={todoInputs.time}
        id="time"
        onChange={handleInputChange}
        placeholder="Time Limit (in minutes)"
        type="number"
        min={2}
        className="mb-md"
      />
      <div className="fr-fe-ct full-width">
        <Button type="button" onClick={onClose} variant="plain" color="primary">
          Cancel
        </Button>
        <Button className="ml-sm">{todo ? "Update" : "Add"}</Button>
      </div>
    </form>
  );
};
