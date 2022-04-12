import { createContext } from "react";
const ContextToken = createContext({
  token: "",
  setToken: () => {},
});
export default ContextToken;