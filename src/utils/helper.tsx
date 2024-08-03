export const saveToken = (token: string) => {
  localStorage.setItem("recipe-token", token);
};
