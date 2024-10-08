import React, { useEffect, useState } from "react";
import { fetchLoggedInUserDetails } from "../apiLayer/index";

function EditProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userDetails = await fetchLoggedInUserDetails();
        setUser(userDetails);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="edit-profile">
      <h1>Edit Profile</h1>
      {user && (
        <div>
          <div>
            <img
              src={user.userImage}
              alt={`${user.fullname}'s profile`}
              className="profile-image"
            />
          </div>
          <div>
            <h2>{user.fullname}</h2>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Designation:</strong> {user.designation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
