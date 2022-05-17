import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../api";
import { paths, toastError } from "../util/constant";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Button } from "../components";
import { minToSecond } from "../util/helper";

export const TodoInfo = () => {
  const { todoId } = useParams();
  const navigate = useNavigate();

  const timerRef = useRef(null);

  const [todoInfo, setTodoInfo] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [startTimer, setStartTimer] = useState(false);

  useEffect(() => {
    getTodoInfoRequest();
  }, [todoId]);

  useEffect(() => {
    todoInfo && setMinute(todoInfo.time);
  }, [todoInfo]);

  useEffect(() => {
    if (startTimer) {
      timerRef.current = setInterval(
        () => setElapsedTime((time) => time + 1),
        1000
      );
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  useEffect(() => {
    if (startTimer) {
      if (second === 0) {
        setSecond(59);
        setMinute((minute) => minute - 1);
      } else {
        setSecond((second) => second - 1);
      }
    }
    hasTimerExpired() && setStartTimer(false);
  }, [elapsedTime]);

  const getTodoInfoRequest = async () => {
    if (!todoId) return;
    try {
      const { status, data } = await api.getTodo(todoId);
      if (status !== 200) return;
      if (!data.habit) {
        navigate(paths.TODO);
        return;
      }
      setTodoInfo(data.habit);
    } catch (error) {
      toast.error(toastError.GENERAL);
    }
  };

  const handleReset = () => {
    setElapsedTime(0);
    setMinute(todoInfo.time);
    setSecond(0);
    setStartTimer(false);
  };

  const getValue = () =>
    todoInfo && (elapsedTime / minToSecond(todoInfo.time)) * 100;

  const getFormattedTime = (time) => (time < 10 ? `0${time}` : time);

  const hasTimerExpired = () =>
    todoInfo && elapsedTime === minToSecond(todoInfo.time);

  return (
    <div className="full-width full-height p-xl todo-info ofy-auto">
      <div className="half-width full-height fc-ct-ct p-xl">
        <h1 className="txt-primary mx-xl font-medium txt-xxl">
          {todoInfo?.title}
        </h1>
        <p className="mx-xl font-medium txt-medium txt-md">
          {todoInfo?.description}
        </p>
      </div>
      {todoInfo && (
        <div className="timer my-md px-xl fc-fs-ct mx-auto my-auto">
          <CircularProgressbar
            value={getValue()}
            text={`${getFormattedTime(minute)} : ${getFormattedTime(second)}`}
            styles={buildStyles({
              textColor: "#81b29a",
              pathColor: "#81b29a",
              tailColor: "#e0e0e0",
            })}
          />
          <div className="fr-fs-ct p-xl">
            {hasTimerExpired() ? (
              <p className="txt-primary txt-xl font-medium">Timer Expired</p>
            ) : (
              <>
                <Button onClick={() => setStartTimer(!startTimer)} size="md">
                  {startTimer
                    ? "Pause"
                    : elapsedTime === 0
                    ? "Start"
                    : "Resume"}{" "}
                  Timer
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outlined"
                  size="md"
                  className="ml-xl"
                >
                  Reset Timer
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
