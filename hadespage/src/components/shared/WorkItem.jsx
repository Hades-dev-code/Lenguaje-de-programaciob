import React from "react";

function WorkItem({ title, icon, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 bg-indigo-50 hover:bg-indigo-100 rounded-xl shadow-md transition duration-300 transform hover:scale-105 flex flex-col"
    >
      {/* Imagen */}
      <div className="mb-4 h-32 w-full overflow-hidden rounded-lg flex items-center justify-center border border-indigo-200">
        <img
          src={icon}
          alt={title}
          className="h-full w-full object-contain p-2"
        />
      </div>

      {/* Título */}
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-700 mt-2">
        {title}
      </h3>

      {/* Texto inferior */}
      <div className="h-10 flex items-end">
        <p className="text-sm text-indigo-600 font-medium mt-2">
          Ver proyecto &rarr;
        </p>
      </div>
    </a>
  );
}

export default WorkItem;