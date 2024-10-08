import React, { useState, useEffect } from "react";
import { fetchTasksForUser, updateTaskStatus } from "../apiLayer/index";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";

const Tasks = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const allTasks = await fetchTasksForUser();
        const userTasks = allTasks.filter(
          (task) => task.assignedUserId === userId
        );
        setTasks(userTasks);
      } catch (error) {
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserTasks();
  }, [userId]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Failed to update task status", error);
    }
  };

  const handleAddTask = () => {
    navigate("/add-new-task");
  };

  const filterTasks = () => {
    return statusFilter === "all"
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">No tasks assigned to you.</div>
      </div>
    );
  }

  const filteredTasks = filterTasks();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Assigned Tasks</h2>
      <div className="flex items-center mb-4 justify-between">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-process">In Process</option>
          <option value="completed">Completed</option>
        </select>
        <button
          onClick={handleAddTask}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Add New Task
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
