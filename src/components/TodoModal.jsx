import clsx from "clsx";
import React from "react";
import { useState } from "react";
import { Button } from "./Button";
import { TextInput } from "./TextInput";
import * as api from "../api";
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "../util/constant";

export const TodoModal = ({ onClose, todo }) => {
  const [todoInputs, setTodoInputs] = useState(
    todo
      ? todo
      : {
          title: "",
          description: "",
          time: "",
          break: "",
          isComplete: false,
        }
  );

  const createTodoRequest = async () => {
    try {
      const { status } = await api.addTodo(todoInputs);
      if (status !== 201) return;
      toast.success(toastSuccess.ADD_TODO);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(toastError.ADD_TODO);
    }
  };

  const updateTodoRequest = async () => {
    const { _id, todoData } = todoInputs;
    try {
      const { status } = await api.updateTodo(_id, todoData);
      if (status !== 200) return;
      toast.success(toastSuccess.UPDATE_TODO);
      onClose();
    } catch (error) {
      console.log(error);
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
        min={5}
        className="mb-md"
      />
      <TextInput
        value={todoInputs.break}
        id="break"
        onChange={handleInputChange}
        placeholder="Break (in minutes)"
        type="number"
        min={1}
        className="mb-md"
      />
      <div className="fr-fe-ct full-width">
        <Button type="button" onClick={onClose} variant="plain" color="primary">
          Cancel
        </Button>
        <Button className="ml-sm">Add</Button>
      </div>
    </form>
  );
};
