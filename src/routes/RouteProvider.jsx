import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Tasks from "../pages/Tasks";
import Users from "../pages/Users";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import AddNewProject from "../pages/AddnewProject";
import AddNewTask from "../pages/AddnewTask";
import ProjectDetails from "../pages/ProjectDetails";

function RouteProvider() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = !!userData;
  const userId = userData?.id;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <Sidebar>
                <Routes>
                  <Route
                    path="/dashboard"
                    element={<Dashboard userId={userId} />}
                  />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/tasks" element={<Tasks userId={userId} />} />
                  <Route path="/add-new-task" element={<AddNewTask />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/add-new-project" element={<AddNewProject />} />
                  <Route
                    path="/projects/:projectId"
                    element={<ProjectDetails />}
                  />
                </Routes>
              </Sidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteProvider;
