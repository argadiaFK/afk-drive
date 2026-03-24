import type { ApiResponse } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Fungsi untuk mengambil secret dari localStorage
const getSecret = () => localStorage.getItem("neko-secret") || "";

// Fungsi untuk menangani error kredensial (Auto Logout)
const handleUnauthorized = (res: Response) => {
  if (res.status === 401) {
    localStorage.removeItem("neko-secret");
    window.location.reload(); // Refresh halaman agar kembali ke menu Login
  }
};

export const api = {
  get: async <T>(path: string): Promise<T> => {
    const res = await fetch(`${API_URL}${path}`, {
      headers: {
        Authorization: getSecret(),
      },
    });

    handleUnauthorized(res);
    const result: ApiResponse<T> = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.error || "API Request Failed");
    }
    return result.data;
  },

  post: async <T>(path: string, body: unknown): Promise<T> => {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getSecret(),
      },
      body: JSON.stringify(body),
    });

    handleUnauthorized(res);
    const result: ApiResponse<T> = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.error || "API Request Failed");
    }
    return result.data;
  },

  delete: async <T>(path: string): Promise<T> => {
    const res = await fetch(`${API_URL}${path}`, {
      method: "DELETE",
      headers: {
        Authorization: getSecret(),
      },
    });

    handleUnauthorized(res);
    const result: ApiResponse<T> = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.error || "API Request Failed");
    }
    return result.data;
  },
};
