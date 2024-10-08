import React from "react";
import { updateTaskStatus } from "../apiLayer/index"; 

const TaskCard = ({ task, onStatusChange }) => {
  const handleStatusChange = async (newStatus) => {
    try {
      await updateTaskStatus(task.id, newStatus);
      onStatusChange(task.id, newStatus);
    } catch (error) {
      console.error("Error changing task status:", error);
    }
  };

  return (
    <div className="w-full p-3 border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-center">
        <div className="flex flex-grow items-center space-x-3">
          <div className="w-1/4">
            <h5 className="text-xs font-semibold">{task.name}</h5>
          </div>

          <div className="w-1/5">
            <p className="text-xs text-gray-600">
              Status:{" "}
              <span
                className={
                  task.status === "pending"
                    ? "text-yellow-500"
                    : task.status === "in-process"
                    ? "text-blue-500"
                    : "text-green-500"
                }
              >
                {task.status}
              </span>
            </p>
          </div>

          <div className="w-1/5">
            <p className="text-xs text-gray-600">Priority: {task.priority}</p>
          </div>

          <div className="w-1/5">
            <p className="text-xs text-gray-600">
              Start Date: {task.startDate}
            </p>
          </div>

          <div className="w-1/5">
            <p className="text-xs text-gray-600">Deadline: {task.deadline}</p>
          </div>
        </div>

        <div className="flex justify-start space-x-1">
          {task.status === "pending" && (
            <>
              <button
                onClick={() => handleStatusChange("in-process")}
                className="bg-yellow-500 text-white px-2 py-1 rounded text-[10px]"
              >
                In Process
              </button>
              <button
                onClick={() => handleStatusChange("completed")}
                className="bg-green-500 text-white px-2 py-1 rounded text-[10px]"
              >
                Completed
              </button>
            </>
          )}
          {task.status === "in-process" && (
            <button
              onClick={() => handleStatusChange("completed")}
              className="bg-green-500 text-white px-2 py-1 rounded text-[10px]"
            >
              Completed
            </button>
          )}
          {task.status === "completed" && (
            <p className="text-xs text-green-600 font-semibold">
              Task Completed
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
