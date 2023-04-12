import React from "react";
import CircleIcon from "../common/CircleIcon";

export default function Features({ icon, text, heading }) {
  return (
    <div >
      <CircleIcon>{icon}</CircleIcon>
      <div className="flex flex-col gap-1 mt-4">
        <p className="text-text-lg font-semibold text-gray-900">{heading}</p>
        <p className="text-text-md font-normal text-gray-600">{text}</p>
      </div>
    </div>
  );
}
