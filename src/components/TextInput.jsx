import clsx from "clsx";
import React, { useState } from "react";

export const TextInput = ({
  className,
  id,
  type,
  value,
  placeholder,
  disabled,
  autoFocus,
  autoComplete,
  children,
  min,
  max,
  onChange,
  onClick,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      onClick={onClick}
      className={clsx(
        "py-sm px-xl txt-xs br-sm full-width fr-fs-ct",
        disabled && "txt-disabled",
        isFocused ? "bd-primary" : "bd-light",
        className
      )}
    >
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        disabled={disabled}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        id={id}
        className="full-width"
      />
      {children}
    </div>
  );
};
