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

api.interceptors.request.use(config => {
  const lang = localStorage.getItem('lang') || 'pt';
  config.params = config.params || {};
  config.params.lang = lang;
  return config;
});

export default api;
