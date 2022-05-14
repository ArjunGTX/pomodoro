import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { paths } from "../util/constant";



export const Logo = ({ className }) => {
  return (
    <Link to={paths.HOME}>
      <div className={clsx("logo txt-primary font-bold", className)}>
        Pomodoro
      </div>
    </Link>
  );
};
