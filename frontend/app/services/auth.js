import api from "./api";

export const register = async (userData) => {
  const response = await api.post("accounts/register/", userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post("accounts/login/", credentials);
  localStorage.setItem("accessToken", response.data.access);
  localStorage.setItem("refreshToken", response.data.refresh);
  return response.data;
};

export const updateUser = async (userData) => {
  const token = localStorage.getItem("accessToken");
  const response = await api.put("accounts/update/", userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUserInfo = async (token) => {
  const response = await api.get("accounts/profile/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
