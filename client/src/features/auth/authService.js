import axios from 'axios';

// const API_URL = 'http://localhost:8080/api';
const API_URL = '/api/users/';

// Register user
const register = async (user) => {
  const response = await axios.post(API_URL + 'register', user);

  if (response.data) {
    sessionStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}

// Login User
const login = async (user) => {
  const response = await axios.post(API_URL + 'login', user);

  if (response.data) {
    sessionStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}

// Logout user
const logout = async () => {
  sessionStorage.removeItem('user');
}

const authService = {
  register,
  login,
  logout
}

export default authService;