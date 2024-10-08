import React from "react";

function UserCard({ user }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-2 transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col items-center">
      <img
        src={user.userImage}
        alt={user.fullname}
        className="w-24 h-24 object-cover rounded-full mb-2"
      />
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        {user.fullname}
      </h2>
      <p className="text-gray-600 text-center">{user.designation}</p>
      <p className="text-gray-500 text-center">{user.email}</p>
    </div>
  );
}

export default UserCard;
