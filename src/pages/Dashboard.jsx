import React, { useEffect, useState } from "react";
import { fetchTasksForUser, fetchProjectsForUser } from "../apiLayer/index";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ userId }) => {
  const [taskCount, setTaskCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [upcomingProject, setUpcomingProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const allTasks = await fetchTasksForUser();
        const userTasks = allTasks.filter(
          (task) => task.assignedUserId === userId
        );
        setTaskCount(userTasks.length);
        setTasks(userTasks);

        const allProjects = await fetchProjectsForUser(userId);
        setProjectCount(allProjects.length);
        setProjects(allProjects);

        const sortedProjects = allProjects.sort(
          (a, b) => new Date(a.deadline) - new Date(b.deadline)
        );
        setUpcomingProject(sortedProjects[0]);
      } catch (error) {
        setError("Failed to fetch tasks or projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div
          className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
          onClick={() => navigate("/projects")}
        >
          <h2 className="text-sm font-semibold text-center">
            Project Whose Deadline Is Closest
          </h2>
          {upcomingProject ? (
            <>
              <p className="text-lg font-semibold">{upcomingProject.name}</p>
              <p className="text-gray-500">
                Description: {upcomingProject.description}
              </p>
              <p className="text-gray-500">
                Deadline: {upcomingProject.deadline}
              </p>
            </>
          ) : (
            <p>No projects available.</p>
          )}
        </div>

        <div
          className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
          onClick={() => navigate("/tasks")}
        >
          <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-semibold">Total Tasks Assigned</h2>
            <p className="text-2xl">{taskCount}</p>

            <h2 className="text-lg font-semibold">Total Projects Assigned</h2>
            <p className="text-2xl">{projectCount}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div
          className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
          onClick={() => navigate("/projects")}
        >
          <h2 className="text-lg font-semibold">Projects Assigned</h2>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-100 shadow-sm rounded-lg p-4"
                >
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-gray-600">Deadline: {project.deadline}</p>
                  <p className="text-gray-500">
                    Description: {project.description}
                  </p>
                </div>
              ))
            ) : (
              <p>No projects assigned.</p>
            )}
          </div>
        </div>

        <div
          className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
          onClick={() => navigate("/tasks")}
        >
          <h2 className="text-lg font-semibold">Tasks Assigned</h2>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-gray-100 shadow-sm rounded-lg p-4"
                >
                  <h3 className="font-semibold">{task.name}</h3>
                  <p className="text-gray-600">Due: {task.deadline}</p>
                  <p className="text-gray-500">Status: {task.status}</p>
                </div>
              ))
            ) : (
              <p>No tasks assigned.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
