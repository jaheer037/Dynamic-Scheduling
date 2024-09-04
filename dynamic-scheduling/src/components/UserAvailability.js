import React, { useState, useEffect } from 'react';
import { getUserAvailability, saveUserAvailability, deleteUserAvailability } from '../services/api';

const UserAvailability = () => {
  const [email, setEmail] = useState('user@example.com'); // Replace with actual user email
  const [availabilities, setAvailabilities] = useState([]);
  const [newAvailability, setNewAvailability] = useState({
    day: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    const fetchAvailability = async () => {
      const data = await getUserAvailability(email);
      if (data) {
        setAvailabilities(data.availabilities);
      }
    };

    fetchAvailability();
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAvailability((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAvailability = async () => {
    const updatedAvailabilities = [...availabilities, newAvailability];
    const savedData = await saveUserAvailability(email, updatedAvailabilities);
    setAvailabilities(savedData.availabilities);
    setNewAvailability({
      day: '',
      startTime: '',
      endTime: '',
    });
  };

  const handleDeleteAvailability = async (index) => {
    const updatedAvailabilities = availabilities.filter((_, i) => i !== index);
    const savedData = await saveUserAvailability(email, updatedAvailabilities);
    setAvailabilities(savedData.availabilities);
  };

  const handleDeleteAll = async () => {
    await deleteUserAvailability(email);
    setAvailabilities([]);
  };

  return (
    <div className="user-availability-container">
      <h1>Set Your Availability</h1>
      <div className="availability-form">
        <select
          name="day"
          value={newAvailability.day}
          onChange={handleChange}
        >
          <option value="">Select Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        <input
          type="time"
          name="startTime"
          value={newAvailability.startTime}
          onChange={handleChange}
          placeholder="Start Time"
        />
        <input
          type="time"
          name="endTime"
          value={newAvailability.endTime}
          onChange={handleChange}
          placeholder="End Time"
        />
        <button onClick={handleAddAvailability}>Add Availability</button>
      </div>
      <div className="availability-list">
        <h2>Your Availability</h2>
        {availabilities.map((availability, index) => (
          <div key={index} className="availability-item">
            <p>
              {availability.day}: {availability.startTime} -{' '}
              {availability.endTime}
            </p>
            <button onClick={() => handleDeleteAvailability(index)}>
              Delete
            </button>
          </div>
        ))}
        <button onClick={handleDeleteAll}>Delete All Availability</button>
      </div>
    </div>
  );
};

export default UserAvailability;
