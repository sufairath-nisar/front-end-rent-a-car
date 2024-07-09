import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const ViewProfile = () => {
  const { user } = useAuth();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      if (!user || !user.email) {
        setError(new Error("User not authenticated"));
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/v1/clients/view-profile/${user.email}`, {
          withCredentials: true, // Ensure credentials are included (cookies)
        });
        console.log("Fetched client data:", response.data);
        setClient(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching client details:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchClient();
  }, [user]);

  if (loading) return <div className="md:h-96 h-72 text-red-700 font-medium">Loading...</div>;
  if (error) return <div>Error fetching client details: {error.message}</div>;

  return (
    <div className="pt-32 pb-12">
      <div className="max-w-lg mx-auto my-8 p-6 bg-white rounded-lg shadow-2xl shadow-red-300">
        <h3 className="font-semibold text-red-700 text-center mb-6">Your Profile Details</h3>
        <div className="space-y-4">
          <p><strong>Email :</strong> <span className="text-red-700">{client.email}</span> </p>
          {/* <p><strong>Role :</strong> <span className="text-red-700">{capitalizeFirstLetter(client.role)}</span></p> */}
          <p><strong>First Name :</strong> <span className="text-red-700">{capitalizeFirstLetter(client.firstName)}</span> </p>
          <p><strong>Last Name :</strong> <span className="text-red-700">{capitalizeFirstLetter(client.lastName)}</span></p>
          <p><strong>Nationality :</strong> <span className="text-red-700">{capitalizeFirstLetter(client.nationality)}</span></p>
          <p><strong>Address :</strong> <span className="text-red-700">{capitalizeFirstLetter(client.address)}</span></p>
          <p><strong>License :</strong> <span className="text-red-700">{capitalizeFirstLetter(client.license)}</span></p>
          {client.role === "corporate" && (
            <>
              <p><strong>Company Name :</strong> <span className="text-red-700">{capitalizeFirstLetter(client.companyName)}</span></p>
              <p><strong>Position :</strong> <span className="text-red-700">{capitalizeFirstLetter(client.position)}</span></p>
              <p><strong>TRN :</strong> <span className="text-red-700">{client.trn}</span></p>
            </>
          )}
          <p><strong>Phone Number :</strong> <span className="text-red-700">{client.ph}</span></p>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
