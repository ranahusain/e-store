const devConfig = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
};

const prodConfig = {
  baseURL: "https://e-store-4scm.onrender.com",
};

export const config = import.meta.env.PROD ? prodConfig : devConfig;
