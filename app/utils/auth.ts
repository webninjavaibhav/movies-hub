import Cookies from "js-cookie";

export const getToken = (): string | null => {
  return Cookies.get("token") || null;
};

export const setToken = (token: string): void => {
  Cookies.set("token", token, { expires: 7 }); // Cookie expires in 7 days
};

export const removeToken = (): void => {
  Cookies.remove("token");
};
