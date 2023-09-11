export const getAuthLogin = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (email === "test@mail.com" && password === "1234test") {
    return { email, password, login: true };
  } else {
    throw new Error("Invalid email or password");
  }
};
