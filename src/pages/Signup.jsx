import React from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUser, loginUser } from "../apiLayer/index";
import BubblesBackground from "../components/BubblesBackground";
import { Link, useNavigate } from "react-router-dom";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate(); 

  
  const onSubmit = async (data) => {
    try {
      const response = await addUser(data);
      console.log("User added successfully:", response);

      
      const userData = await loginUser(data.username, data.password);
      localStorage.setItem("user", JSON.stringify(userData)); 

      toast.success("Signup and login successful!", {
        autoClose: 5000,
      });

      reset();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error during signup or login:", error);
      toast.error("Signup failed. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <BubblesBackground />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center bg-transparent">
        <div className="flex items-center mb-8">
          <img
            src=".././public/icon.png"
            alt="Efficio Logo"
            className="w-32 h-32"
          />
          <h1 className="text-[60px] sm:text-[80px] md:text-[100px] font-extrabold text-[#1f2937] leading-none">
            Efficio
          </h1>
        </div>

        <div className="bg-[#ffffff] p-8 rounded shadow-md w-full max-w-md animate-slideIn relative z-20">
          <h2 className="text-2xl font-bold text-[#1f2937] mb-6">Signup</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-[#1f2937]">Full Name</label>
              <input
                type="text"
                {...register("fullname", { required: true })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter your full name"
              />
              {errors.fullname && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-[#1f2937]">Username</label>
              <input
                type="text"
                {...register("username", { required: true })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter your username"
              />
              {errors.username && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-[#1f2937]">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-[#1f2937]">Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-[#1f2937]">Phone</label>
              <input
                type="tel"
                {...register("phone", { required: true })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-[#1f2937]">Designation</label>
              <input
                type="text"
                {...register("designation", { required: true })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter your designation"
              />
              {errors.designation && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-[#1f2937]">Profile Image Name</label>
              <input
                type="text"
                {...register("userImage", { required: true })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter image name (e.g., sita.jpg)"
                onChange={(e) => {
                  const imageName = e.target.value;
                  setValue("userImage", `../public/userimage/${imageName}`);
                }}
              />
              <span className="text-gray-400">{`../public/userimage/`}</span>
              {errors.userImage && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#1f2937] text-[#ffffff] py-2 rounded hover:bg-opacity-90"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-sm text-[#1f2937]">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-blue-500 hover:underline">Login</span>
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default SignupForm;
