export const paths = {
  HOME: "/",
  LOGIN: "/login",
  SIGN_UP: "/sign-up",
  TODO: "/todo",
};

export const guestUser = {
  EMAIL: "guestuser@email.com",
  PASSWORD: "GuestUser@123",
};

export const constants = {
  AUTH: "auth",
  ACCESS_TOKEN: "accessToken",
};

export const toastSuccess = {
  LOGIN: "Login successful",
  SIGN_UP: "Sign up successful",
  LOG_OUT: "User logged out",
  ADD_TODO: "Task added",
  UPDATE_TODO: "Task updated",
  DELETE_TODO: "Task deleted",
};

export const toastError = {
  LOGIN: "Login failed, Please try again",
  SIGN_UP: "Sign up failed, Please try again",
  LOG_OUT: "Failed to logout user, Please try again",
  GENERAL: "Something went wrong!",
  ADD_TODO: "Could not add Task. Please try again",
  UPDATE_TODO: "Could not update Task. Please try again",
  DELETE_TODO: "Could not delete Task. Please try again",
};
