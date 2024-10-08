import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { fetchProjects } from "../apiLayer/index";
import { useNavigate } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectData = await fetchProjects();
        setProjects(projectData);
        setFilteredProjects(projectData);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleStatusChange = async () => {
    const projectData = await fetchProjects();
    setProjects(projectData);
    filterProjects(statusFilter, projectData);
  };

  const filterProjects = (status, projectData) => {
    let filtered =
      status === "all"
        ? projectData
        : projectData.filter((project) => project.status === status);
    filtered = sortProjectsByPriority(filtered);
    setFilteredProjects(filtered);
  };

  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);
    filterProjects(selectedStatus, projects);
  };

  const sortProjectsByPriority = (projects) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return projects.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  };

  const handleAddProject = () => {
    navigate("/add-new-project");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <div className="flex items-center mb-4 justify-between">
        <div>
          <label className="mr-2 font-semibold">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={handleFilterChange}
            className="border border-gray-400 p-2 rounded"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-process">In Process</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          onClick={handleAddProject}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red"
        >
          Add New Project
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;
