import axios from "./index";
export default (username, password) => {
  return axios.post("/login", {
    username,
    password
  });
};
