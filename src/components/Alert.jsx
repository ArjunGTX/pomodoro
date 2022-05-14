import React from "react";
import { FiAlertCircle } from "react-icons/fi";

export const Alert = ({ className, message }) => {
  return (
    <div className={`fr-ct-ct input-alert ${className ? className : ""}`}>
      <FiAlertCircle className="txt-md txt-error" />
      <p className="txt-error ml-xs">{message}</p>
    </div>
  );
};
