import React from "react";
import { updateProjectStatus } from "../apiLayer/index";
import { useNavigate } from "react-router-dom";

function ProjectCard({ project, onStatusChange }) {
  const navigate = useNavigate();

  const handleStatusChange = async (newStatus) => {
    try {
      await updateProjectStatus(project.id, newStatus);
      onStatusChange();
    } catch (error) {
      console.error("Error changing project status:", error);
    }
  };

  const handleCardClick = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 mb-4 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="text-center mb-2">
        <span
          className={`text-lg font-semibold ${
            project.status === "pending"
              ? "text-red-500"
              : project.status === "in-process"
              ? "text-yellow-500"
              : project.status === "completed"
              ? "text-green-500"
              : "text-gray-500"
          }`}
        >
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
      </div>

      <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
      <p className="mb-2">Priority: {project.priority}</p>
      <p className="mb-2">Deadline: {project.deadline}</p>

      <div className="flex justify-center space-x-2">
        {project.status === "pending" && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange("in-process");
              }}
              className="bg-yellow-500 text-white px-3 py-1 rounded text-[12px]"
            >
              In Process
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange("completed");
              }}
              className="bg-green-500 text-white px-3 py-1 rounded text-[12px]"
            >
              Completed
            </button>
          </>
        )}
        {project.status === "in-process" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange("completed");
            }}
            className="bg-green-500 text-white px-3 py-1 rounded text-[12px]"
          >
            Completed
          </button>
        )}
        {project.status === "completed" && (
          <p className="text-green-600 font-semibold">Project Completed</p>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
