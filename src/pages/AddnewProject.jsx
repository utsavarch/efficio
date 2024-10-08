import React, { useState, useEffect } from "react";
import { fetchProjects, fetchUsers, addProject } from "../apiLayer/index";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoArrowBack } from "react-icons/io5";

const AddNewProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [startDate, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [userIds, setUserIds] = useState([]);
  const [existingProjects, setExistingProjects] = useState([]);
  const [existingUsers, setExistingUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const projects = await fetchProjects();
        const users = await fetchUsers(); 
        setExistingProjects(projects);
        setExistingUsers(users);
      } catch (error) {
        console.error("Error fetching data:", error);
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

    const projectData = {
      name,
      description,
      priority,
      startDate,
      deadline,
      userIds, 
      status: "pending", 
    };

    setLoading(true); 
    try {
    
      await addProject(projectData, existingProjects);
      toast.success("Project added successfully!"); 
     
      setName("");
      setDescription("");
      setPriority("Medium");
      setStartDate("");
      setDeadline("");
      setUserIds([]);
      navigate("/projects"); 
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to add project. Please try again."); 
    } finally {
      setLoading(false); 
    }
  };

  const handleUserChange = (userId) => {
    setUserIds(
      (prevUserIds) =>
        prevUserIds.includes(userId)
          ? prevUserIds.filter((id) => id !== userId) 
          : [...prevUserIds, userId] 
    );
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
        <h2 className="text-3xl font-bold text-center mb-6">Add New Project</h2>
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
                Description:
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                Assign Users:
              </label>
              <div className="mt-1 grid grid-cols-2 gap-4">
                {existingUsers.map((user) => (
                  <div key={user.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`user-${user.id}`}
                      checked={userIds.includes(user.id)}
                      onChange={() => handleUserChange(user.id)}
                      className="mr-2 focus:ring-red-400"
                    />
                    <label
                      htmlFor={`user-${user.id}`}
                      className="text-sm text-gray-700"
                    >
                      {user.fullname} ({user.username})
                    </label>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Select user(s) to assign to the project.
              </p>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-400"
          >
            {loading ? "Adding..." : "Add Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewProject;
