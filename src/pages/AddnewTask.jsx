import React, { useState, useEffect } from "react";
import { fetchUsers, fetchProjects, addTask } from "../apiLayer/index";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoArrowBack } from "react-icons/io5";

const AddNewTask = () => {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [startDate, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [existingUsers, setExistingUsers] = useState([]);
  const [existingProjects, setExistingProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const users = await fetchUsers();
        const projects = await fetchProjects();
        setExistingUsers(users);
        setExistingProjects(projects);
      } catch (error) {
        console.error("Error fetching users or projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (new Date(startDate) >= new Date(deadline)) {
      alert("Start date must be before the deadline.");
      return;
    }

    const taskData = {
      name,
      priority,
      startDate,
      deadline,
      assignedUserId,
      projectId,
      status: "pending",
    };

    setLoading(true);
    try {
      await addTask(taskData);
      toast.success("Task added successfully!");

      setName("");
      setPriority("Medium");
      setStartDate("");
      setDeadline("");
      setAssignedUserId("");
      setProjectId("");

      navigate("/tasks");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <IoArrowBack size={24} />
          </button>
        </div>
        <h2 className="text-3xl font-bold text-center mb-6">Add New Task</h2>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Priority:
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date:
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Deadline:
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assign User:
              </label>
              <select
                value={assignedUserId}
                onChange={(e) => setAssignedUserId(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <option value="">Select a user</option>
                {existingUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fullname} ({user.username})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assign To Project:
              </label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <option value="">Select a project</option>
                {existingProjects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-400"
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewTask;
