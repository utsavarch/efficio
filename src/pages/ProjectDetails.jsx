import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProjectDetails } from "../apiLayer/index";
import { IoArrowBack } from "react-icons/io5";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [projectTasks, setProjectTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { projectData, usersData, tasksData } = await fetchProjectDetails(
          projectId
        );
        setProject(projectData);

        const assignedUsersData = usersData.filter((user) =>
          projectData.userIds.includes(user.id)
        );
        setAssignedUsers(assignedUsersData);
        setProjectTasks(tasksData);
      } catch (error) {
        console.error("Error fetching project details:", error.message);
        setError("Failed to load project details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  if (loading) {
    return <div>Loading project details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-600";
      case "pending":
        return "bg-red-100 text-red-600";
      case "in-process":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <IoArrowBack size={24} />
        </button>
      </div>

      <div className="flex w-full">
        <div className="w-3/4 p-4 border border-gray-300 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
          <p className="mb-4">
            <strong>Status:</strong> {project.status}
          </p>
          <p className="mb-4">
            <strong>Description:</strong> {project.description}
          </p>
          <p className="mb-4">
            <strong>Start Date:</strong>{" "}
            {new Date(project.startDate).toLocaleDateString()}
          </p>
          <p className="mb-4">
            <strong>Deadline:</strong>{" "}
            {new Date(project.deadline).toLocaleDateString()}
          </p>
          <p className="mb-4">
            <strong>Priority:</strong> {project.priority}
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">Associated Tasks</h2>
          {projectTasks.length > 0 ? (
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-200 px-4 py-2">Status</th>
                  <th className="border border-gray-200 px-4 py-2">
                    Task Name
                  </th>
                  <th className="border border-gray-200 px-4 py-2">Priority</th>
                  <th className="border border-gray-200 px-4 py-2">
                    Start Date
                  </th>
                  <th className="border border-gray-200 px-4 py-2">End Date</th>
                </tr>
              </thead>
              <tbody>
                {projectTasks.map((task) => (
                  <tr key={task.id}>
                    <td
                      className={`border border-gray-200 px-4 py-2 ${getStatusColor(
                        task.status
                      )}`}
                    >
                      <span
                        className={`font-semibold ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {task.name}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {task.priority}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {new Date(task.startDate).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {new Date(task.deadline).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No tasks available for this project.</p>
          )}
        </div>

        <div className="w-1/4 p-4 mt-4 ml-4">
          <h2 className="text-xl font-semibold mb-4">Assigned Users</h2>
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-lg">
            {assignedUsers.length > 0 ? (
              <ul className="space-y-2">
                {assignedUsers.map((user) => (
                  <li key={user.id} className="flex flex-col items-center">
                    <img
                      src={user.userImage || "default-image-url.jpg"}
                      alt={`${user.fullname}'s avatar`}
                      className="w-[50px] h-[50px] rounded-full mb-2 object-cover"
                    />
                    <span className="text-center">
                      {user.fullname} ({user.designation})
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users assigned to this project.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
