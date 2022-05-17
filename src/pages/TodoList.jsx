import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button, TodoCard, TodoModal } from "../components";
import { useAuth, useTodo } from "../context";
import { paths, toastSuccess } from "../util/constant";
import { FaPlusCircle } from "react-icons/fa";

export const TodoList = () => {
  const navigate = useNavigate();
  const { auth,setAuth } = useAuth();
  const { todos, syncTodosWithServer } = useTodo();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    syncTodosWithServer();
  }, []);

  const handleLogout = () => {
    setAuth(null);
    navigate(paths.LOGIN);
    toast.success(toastSuccess.LOG_OUT);
  };

  return (
    <div className="full-width full-height fc-fs-fs p-xl">
      <div className="fr-sb-ct full-width px-xl pb-xl">
        <div className="fc-fs-fs">
          <h1 className="txt-primary font-medium">Hello {`${auth.firstName} ${auth.lastName}`}</h1>
          <p className="txt-medium">
            You have {todos.filter(todo => !todo.isComplete).length} Tasks{" "}
            <span className="txt-primary font-medium">Todo</span>
          </p>
        </div>
        <Button onClick={handleLogout} variant="outlined">
          Logout
        </Button>
      </div>
      <div className="fc-fs-fs full-width full-height bg-secondary-light br-sm of-hidden shadow-light">
        <div className="p-xl full-width bg-primary fr-sb-bl txt-light">
          <h2 className="font-medium txt-xl">Tasks</h2>
          <button onClick={() => setShowModal(true)} className="mr-xl">
            <FaPlusCircle className="txt-xl txt-light" />
          </button>
        </div>
        <div className="full-width full-height ofy-auto fc-fs-fs">
          {todos?.map((todo) => (
            <TodoCard key={todo._id} todo={todo} />
          ))}
        </div>
      </div>
      {showModal && <TodoModal onClose={() => setShowModal(false)} />}
    </div>
  );
};
