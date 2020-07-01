import axios from "axios";

const BASEURL = "http://localhost:5000";

export default async (word) => {
  const response = await axios.get(`${BASEURL}/${word}`);
  const { data } = await response;
  return Object.values(data[0])[1];

  // data = [{_id:"objectId",[word]:{...years}}]
};
