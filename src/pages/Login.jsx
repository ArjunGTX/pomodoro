import React, { useEffect, useState } from "react";
import { Alert, Button, Logo, TextInput } from "../components";
import {
  constants,
  guestUser,
  paths,
  toastError,
  toastSuccess,
} from "../util/constant";
import * as api from "../api";
import * as validate from "../util/validator";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const Login = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [inputErrors, setInputErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (auth?.isLoggedIn) {
      navigate(-1);
    }
  }, []);

  const loginRequest = async (email, password) => {
    const { isValid, errors } = validate.login(
      { email, password },
      inputErrors
    );
    if (!isValid) {
      setInputErrors(errors);
      return;
    }
    try {
      const { data, status } = await api.login(email, password);
      if (status !== 200) return;
      setAuth({
        isLoggedIn: true,
        firstName: data.foundUser.firstName,
        lastName: data.foundUser.lastName,
        userId: data.foundUser._id,
      });
      localStorage.setItem(constants.ACCESS_TOKEN, data.encodedToken);
      navigate(paths.TODO);
      toast.success(toastSuccess.LOGIN);
    } catch (error) {
      toast.error(toastError.LOGIN);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginRequest(inputs.email, inputs.password);
  };

  const handleGuestLogin = () =>
    loginRequest(guestUser.EMAIL, guestUser.PASSWORD);

  const handleInputChange = (e) => {
    setInputs((inputs) => ({
      ...inputs,
      [e.target.id]: e.target.value,
    }));
    setInputErrors((errors) => ({
      ...errors,
      [e.target.id]: "",
    }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="full-page bg-secondary fc-fs-fs txt-light">
      <div className="fr-fs-ct full-width p-xl pos-abs">
        <Logo className="m-xl" />
      </div>
      <div className="full-width full-height fr-ct-ct">
        <form
          onSubmit={handleLogin}
          className="br-sm shadow-medium bg-secondary-light p-xl auth-form"
        >
          <div className="fr-sb-ct pt-xs px-xl">
            <h2 className="txt-primary font-medium">Login</h2>
          </div>
          <div className="full-width p-xl fc-fs-fs">
            <div className="full-width fc-fs-fs">
              <TextInput
                type="text"
                placeholder="Email"
                className="my-sm"
                value={inputs.email}
                onChange={handleInputChange}
                id="email"
              />
              {inputErrors.email && (
                <Alert message={inputErrors.email} className="mt-xs" />
              )}
            </div>
            <div className="full-width fc-fs-fs">
              <TextInput
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="my-sm"
                value={inputs.password}
                onChange={handleInputChange}
                id="password"
              >
                <button
                  type="button"
                  className="txt-medium fr-ct-ct"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <AiOutlineEye className="txt-sm" />
                  ) : (
                    <AiOutlineEyeInvisible className=" txt-sm" />
                  )}
                </button>
              </TextInput>
              {inputErrors.password && (
                <Alert message={inputErrors.password} className="mt-xs" />
              )}
            </div>
            <Button className="full-width mx-auto my-sm">Login</Button>
            <div className="mt-sm full-width fr-sb-ct">
              <div className="half-width fr-ct-ct pr-sm">
                <Button
                  type="button"
                  to={paths.SIGN_UP}
                  variant="outlined"
                  className="full-width"
                >
                  Create New Account
                </Button>
              </div>
              <div className="half-width fr-ct-ct pl-sm">
                <Button
                  onClick={handleGuestLogin}
                  type="button"
                  variant="outlined"
                  className="full-width"
                >
                  Guest Login
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
