import React, { useState, useRef, useEffect } from "react";
import { MdEditCalendar } from "react-icons/md";
import {
  BsCalendarCheckFill,
  BsTrashFill,
  BsCalendarXFill,
} from "react-icons/bs";
import clsx from "clsx";
import { TodoModal } from "./TodoModal";
import * as api from "../api";
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "../util/constant";
import { useTodo } from "../context";

export const TodoCard = ({ className, todo }) => {
  const { syncTodosWithServer } = useTodo();

  const initialRender = useRef(true);

  const [showModal, setShowModal] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    !initialRender.current && toggleTodoStatus();
    initialRender.current = false;
  }, [isComplete]);

  const toggleTodoStatus = async () => {
    try {
      const { status } = await api.updateTodo(todo._id, {
        ...todo,
        isComplete,
      });
      if (status !== 200) return;
      syncTodosWithServer();
    } catch (error) {
      toast.error(toastError.GENERAL);
    }
  };

  const deleteTodoRequest = async () => {
    try {
      const { status, data } = await api.deleteTodo(todo._id);
      if (status !== 200) return;
      syncTodosWithServer();
      toast.success(toastSuccess.DELETE_TODO);
    } catch (error) {
      toast.error(toastError.DELETE_TODO);
    }
  };

  return (
    <div
      className={clsx(
        "p-xl ul-light full-width fr-sb-ct cursor-pointer",
        isComplete ? "bg-secondary txt-medium" : "bg-secondary-light",
        className
      )}
    >
      <span className={clsx("font-medium", isComplete && "txt-strike")}>
        {todo?.title}
      </span>
      <div className="fr-ct-ct">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsComplete(!isComplete);
          }}
          className="mx-lg"
        >
          {isComplete ? <BsCalendarXFill /> : <BsCalendarCheckFill />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(true);
          }}
          disabled={showModal}
          className="mx-lg"
        >
          <MdEditCalendar className="txt-md" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteTodoRequest();
          }}
          className="mx-lg"
        >
          <BsTrashFill className="txt-md" />
        </button>
      </div>
      {showModal && (
        <TodoModal todo={todo} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};
