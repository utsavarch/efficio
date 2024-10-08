import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    
    const userData = localStorage.getItem("user");
    console.log("Retrieved user data from localStorage:", userData); 
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return <div>Loading user data...</div>; 
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-lg p-8">
        <div className="flex flex-col items-center">
          <img
            src={
              user.userImage.startsWith("..")
                ? "/userimage/utsav.jpeg"
                : user.userImage
            } 
            alt="User Profile"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h2 className="text-2xl font-semibold">{user.fullname}</h2>
          <p className="text-sm text-gray-500 mb-6">@{user.username}</p>

          <div className="w-full text-left space-y-4 mb-8">
            <div className="flex justify-between">
              <span className="font-semibold">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Phone:</span>
              <span>{user.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Designation:</span>
              <span>{user.designation}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
