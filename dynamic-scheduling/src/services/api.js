const API_URL = 'http://localhost:5000/api/availability';

export const getUserAvailability = async (email) => {
  const response = await fetch(`${API_URL}/${email}`);
  return response.json();
};

export const saveUserAvailability = async (email, availabilities) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, availabilities }),
  });
  return response.json();
};

export const deleteUserAvailability = async (email) => {
  const response = await fetch(`${API_URL}/${email}`, {
    method: 'DELETE',
  });
  return response.json();
};
