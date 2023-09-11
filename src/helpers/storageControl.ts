export const setLogin = (token: boolean) => {
  if (typeof window !== "undefined")
    localStorage.setItem("user:login", String(token));
};

export const getLogin = () => {
  return localStorage.getItem("user:login");
};
