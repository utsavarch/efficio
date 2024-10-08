import axios from "axios";

const baseUrl = "http://localhost:5000";

export const apiCallInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error, action) => {
  console.error(`Error during ${action}:`, error);
  throw error;
};

export const fetchProjects = async () => {
  try {
    const response = await apiCallInstance.get("/projects");
    return response.data;
  } catch (error) {
    handleError(error, "fetching projects");
  }
};

export const fetchProjectsForUser = async (userId) => {
  try {
    const response = await fetchProjects();
    return response.filter(
      (project) => project.userIds && project.userIds.includes(userId)
    );
  } catch (error) {
    handleError(error, "fetching projects for user");
  }
};

export const fetchUsers = async () => {
  try {
    const response = await apiCallInstance.get("/users");
    return response.data.filter((user) => {
      const {
        id,
        username,
        fullname,
        email,
        password,
        phone,
        designation,
        userImage,
      } = user;
      return (
        id &&
        username &&
        fullname &&
        email &&
        password &&
        phone &&
        designation &&
        userImage
      );
    });
  } catch (error) {
    handleError(error, "fetching users");
  }
};

export const fetchTasks = async () => {
  try {
    const response = await apiCallInstance.get("/tasks");
    return response.data;
  } catch (error) {
    handleError(error, "fetching tasks");
  }
};

export const fetchProjectDetails = async (projectId) => {
  try {
    const projectPromise = apiCallInstance.get(`/projects/${projectId}`);
    const usersPromise = fetchUsers();
    const tasksPromise = fetchTasks();

    const [projectResponse, usersResponse, tasksResponse] = await Promise.all([
      projectPromise,
      usersPromise,
      tasksPromise,
    ]);

    const projectData = projectResponse.data;
    const usersData = usersResponse;
    const tasksData = tasksResponse.filter(
      (task) => task.projectId === projectId
    );

    return { projectData, usersData, tasksData };
  } catch (error) {
    handleError(error, "fetching project details");
  }
};

const getNextUserId = async () => {
  try {
    const users = await fetchUsers();
    const lastId =
      users.length === 0
        ? 0
        : Math.max(...users.map((user) => Number(user.id)));
    return lastId + 1;
  } catch (error) {
    handleError(error, "fetching users for ID generation");
  }
};

export const addUser = async (userData) => {
  try {
    const newUserId = await getNextUserId();
    const response = await apiCallInstance.post("/users", {
      id: newUserId,
      ...userData,
    });
    return response.data;
  } catch (error) {
    handleError(error, "adding user");
  }
};

export const loginUser = async (usernameOrEmail, password) => {
  try {
    const users = await fetchUsers();
    const user = users.find(
      (u) =>
        (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
        u.password === password
    );

    if (user) {
      return user;
    } else {
      throw new Error("Invalid username/email or password.");
    }
  } catch (error) {
    handleError(error, "logging in");
  }
};

export const fetchProjectsAndUsers = async () => {
  try {
    const [projects, users] = await Promise.all([
      fetchProjects(),
      fetchUsers(),
    ]);
    return { projects, users };
  } catch (error) {
    handleError(error, "fetching projects and users");
  }
};

export const updateProjectStatus = async (projectId, newStatus) => {
  try {
    const response = await apiCallInstance.patch(`/projects/${projectId}`, {
      status: newStatus,
    });
    return response.data;
  } catch (error) {
    handleError(error, "updating project status");
  }
};

const getNextProjectId = (projects) => {
  return projects.length === 0
    ? 1
    : Math.max(...projects.map((project) => Number(project.id))) + 1;
};

export const addProject = async (projectData, existingProjects) => {
  try {
    const newProjectId = getNextProjectId(existingProjects);
    const formattedUserIds = projectData.userIds.map((id) => Number(id));
    const response = await apiCallInstance.post("/projects", {
      id: newProjectId,
      ...projectData,
      userIds: formattedUserIds,
    });
    return response.data;
  } catch (error) {
    handleError(error, "adding project");
  }
};

const getNextTaskId = async () => {
  try {
    const tasks = await fetchTasks();
    const lastId =
      tasks.length === 0
        ? 0
        : Math.max(...tasks.map((task) => Number(task.id)));
    return lastId + 1;
  } catch (error) {
    handleError(error, "fetching tasks for ID generation");
  }
};

export const addTask = async (taskData) => {
  try {
    const newTaskId = await getNextTaskId();
    const response = await apiCallInstance.post("/tasks", {
      id: newTaskId,
      ...taskData,
    });
    return response.data;
  } catch (error) {
    handleError(error, "adding task");
  }
};

export const fetchTasksForUser = async (userId) => {
  try {
    const response = await apiCallInstance.get("/tasks");
    return response.data.filter((task) => task.assignedTo === userId);
  } catch (error) {
    handleError(error, "fetching tasks for user");
  }
};

const getLoggedInUserId = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  return user ? user.id : null;
};

export const fetchTasksForLoggedInUser = async () => {
  try {
    const loggedInUserId = getLoggedInUserId();
    if (!loggedInUserId) {
      throw new Error("No user is currently logged in.");
    }

    const response = await apiCallInstance.get("/tasks");
    const assignedTasks = response.data.filter(
      (task) => task.assignedUserId === loggedInUserId
    );

    return assignedTasks;
  } catch (error) {
    handleError(error, "fetching tasks for logged-in user");
  }
};

export const fetchProjectsForLoggedInUser = async () => {
  try {
    const loggedInUserId = getLoggedInUserId();
    if (!loggedInUserId) {
      throw new Error("No user is currently logged in.");
    }

    const response = await fetchProjects();
    const assignedProjects = response.filter(
      (project) => project.userIds === loggedInUserId
    );

    return assignedProjects;
  } catch (error) {
    handleError(error, "fetching projects for logged-in user");
  }
};

export const updateTaskStatus = async (taskId, newStatus) => {
  try {
    const response = await apiCallInstance.patch(`/tasks/${taskId}`, {
      status: newStatus,
    });
    return response.data;
  } catch (error) {
    handleError(error, "updating task status");
  }
};
