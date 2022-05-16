import React from 'react'
import { MdEditCalendar } from "react-icons/md";
import { BsCalendarCheckFill, BsTrashFill } from "react-icons/bs";
import clsx from 'clsx';

export const TodoCard = ({className}) => {
  return (
    <div
    className={clsx("p-xl ul-light full-width fr-sb-ct cursor-pointer",className)}
  >
    <span className="font-medium">"Todo Item</span>
    <div className="fr-ct-ct">
      <button className="mx-lg">
        <BsCalendarCheckFill />
      </button>
      <button className="mx-md">
        <MdEditCalendar className="txt-md" />
      </button>
      <button className="mx-md">
        <BsTrashFill className="txt-md" />
      </button>
    </div>
  </div>
  )
}
