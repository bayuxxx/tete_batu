import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api/axios';
import Swal from 'sweetalert2';

axios.defaults.baseURL = api.baseURL;

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivities = async () => {
    try {
      const response = await axios.get("/activities");
      setActivities(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching activities");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const showDetails = (activity) => {
    Swal.fire({
      title: activity.title,
      html: `
        <div class="mb-4">
          <img src="${activity.imageUrl}" alt="${activity.title}" class="w-full h-64 object-cover rounded-lg"/>
        </div>
        <div class="text-justify">
          ${activity.description}
        </div>
      `,
      width: '600px',
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        container: 'swal-custom-container',
        popup: 'swal-custom-popup',
        content: 'swal-custom-content'
      }
    });
  };

  if (loading) {
    return (
      <section id="activities" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Activities</h2>
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="activities" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Activities</h2>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="activities" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <div key={activity.id || index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={activity.imageUrl} 
                alt={activity.title} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                <p className="text-gray-700 text-justify line-clamp-4 mb-4">{activity.description}</p>
                <button
                  onClick={() => showDetails(activity)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activities;