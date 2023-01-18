import axios from "axios";
export const saveMyImage = async (src, loc) => {
  return axios.post("http://localhost:1323/v1/save-my-image", {
    myImage: src,
    location: loc
  });
};
