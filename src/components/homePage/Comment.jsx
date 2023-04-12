import React from "react";

export default function Comments({ comment, name, pictureUrl }) {
  return (
    <div className="flex flex-col items-center justify-center h-[300px]"  >
      <p className="text-display-sm font-medium text-gray-900 mb-8 text-center">"{comment}"</p>
      <img className="rounded-full w-16 h-16 object-cover mb-4" src={pictureUrl} alt="" />
      <p className="text-text-lg font-semibold text-gray-900 ">{name}</p>
    </div>
  );
}
