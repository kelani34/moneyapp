import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";
import {
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT,
  authReducer,
  initialState,
} from "./AuthReducer";
import { getAuthLogin } from "../service/auth";
import toast from "react-hot-toast";
import { getLogin, setLogin } from "../helpers/storageControl";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [login, loginDispatch] = useReducer(authReducer, initialState);
  const [loggedInState, setLoggedInState] = useState<boolean>(!!getLogin());

  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loginData = String(getLogin());
    setLoggedInState(JSON.parse(loginData));
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    loginDispatch({ type: LOGIN_LOADING });
    try {
      const user = await getAuthLogin(email, password);

      if (user?.login) {
        toast.success("You have successfully logged in");
        loginDispatch({ type: LOGIN_SUCCESS, payload: user });
        setLoggedInState(true);
        setLogin(true);
        setLogoutTimer(120000);
      } else {
        loginDispatch({ type: LOGIN_FAIL, payload: "Login failed" });
        setLoggedInState(false);
        setLogin(false);
        toast.error("Login failed. Please try again");
      }
    } catch (error) {
      loginDispatch({ type: LOGIN_FAIL, payload: "An error occurred" });
      setLoggedInState(false);
      setLogin(false);
      toast.error("Invalid email or password");
    }
  }, []);

  const handleLogout = useCallback(() => {
    clearLogoutTimer();
    loginDispatch({ type: LOGOUT });
    setLoggedInState(false);
    setLogin(false);
  }, []);

  const setLogoutTimer = (timeout: number) => {
    clearLogoutTimer();
    logoutTimerRef.current = setTimeout(() => {
      handleLogout();
    }, timeout);
  };

  const clearLogoutTimer = () => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  };

  const values = { handleLogin, login, handleLogout, loggedInState };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
