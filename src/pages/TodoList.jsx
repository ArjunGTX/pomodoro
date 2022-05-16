import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button, TodoCard, TodoModal } from "../components";
import { useAuth } from "../context";
import { paths, toastSuccess } from "../util/constant";
import { FaPlusCircle } from "react-icons/fa";
import { useState } from "react";

export const TodoList = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setAuth(null);
    navigate(paths.LOGIN);
    toast.success(toastSuccess.LOG_OUT);
  };

  const todo = ["todo1", "todo2"];
  return (
    <div className="full-width full-height fc-fs-fs p-xl">
      <div className="fr-sb-ct full-width px-xl pb-xl">
        <div className="fc-fs-fs">
          <h1 className="txt-primary font-medium">Hello User</h1>
          <p className="txt-medium">
            You have 3 Tasks{" "}
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
          {todo.map((todo) => (
            <TodoCard key={todo} />
          ))}
        </div>
      </div>
      {showModal && <TodoModal onClose={() => setShowModal(false)} />}
    </div>
  );
};
