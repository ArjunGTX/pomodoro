import * as api from ".";

export const login = async (email, password) =>
  await api.axiosPost("/api/auth/login", false, {
    email,
    password,
  });

export const signUp = async (firstName, lastName, email, password) =>
  await api.axiosPost("/api/auth/signup", false, {
    firstName,
    lastName,
    email,
    password,
  });
