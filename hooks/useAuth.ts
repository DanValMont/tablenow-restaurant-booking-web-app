import { AuthenticationContext } from "@/context/AuthContext";
import { IsBookedContext } from "@/context/BookedContext";
import axios from "axios";
import { removeCookies } from "cookies-next";
import { useContext } from "react";

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);
  const { setBookedState } = useContext(IsBookedContext);
  const signin = async (
    { email, password }: { email: string; password: string },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axios.post(
        "/api/auth/signin",
        { email, password }
      );
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  const signup = async (
    {
      email,
      password,
      firstName,
      lastName,
      city,
      phone,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      city: string;
      phone: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axios.post(
        "/api/auth/signup",
        { email, password, firstName, lastName, city, phone }
      );
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  const signout = () => {
    removeCookies("jwt");

    setAuthState({
      data: null,
      error: null,
      loading: false,
    });

    setBookedState({
      booked: false,
    });
  };

  return {
    signin,
    signup,
    signout,
  };
};

export default useAuth;
