
import API from "./api";

export const signupUser = async (userData) => {

  const response = await API.post(
    "/auth/signup",
    userData
  );

  return response.data;
};


export const loginUser = async (username, password) => {

  const formData = new URLSearchParams();

  formData.append("username", username);
  formData.append("password", password);

  const response = await API.post(
    "/auth/login",
    formData,
    {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};