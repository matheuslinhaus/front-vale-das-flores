import axios from "axios";

const api = axios.create({
  baseURL: "https://vale-das-flores-production.up.railway.app/", 
});

api.interceptors.response.use(
    (response) => response, 
    (error) => {
      if (error.message.includes("Network Error") || error.code === "ECONNABORTED") {
        return Promise.reject({
          response: {
            status: 503,
            data: {
              message: "O servidor está indisponível. Tente novamente mais tarde.",
            },
          },
        });
      }
      return Promise.reject(error);
    }
  );

export default api;