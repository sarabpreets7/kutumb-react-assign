import axios from "axios";

const API_BASE = "https://assignment.stage.crafto.app";

export const login = async (username, otp) => {
  const response = await axios.post(`${API_BASE}/login`, { username, otp });
  return response.data;
};

export const getQuotes = async (token, limit, offset) => {
  const response = await axios.get(`${API_BASE}/getQuotes`, {
    headers: { Authorization: token },
    params: { limit, offset },
  });
  return response.data;
};

export const postQuote = async (token, text, mediaUrl) => {
  const response = await axios.post(
    `${API_BASE}/postQuote`,
    { text, mediaUrl },
    { headers: { Authorization: token } }
  );
  return response.data;
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post(
    "https://crafto.app/crafto/v1.0/media/assignment/upload",
    formData
  );
  return response.data;
};
