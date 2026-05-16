const API = "https://task-api-46uc.onrender.com"; 
//const API = "http://127.0.0.1:8000";


export const taskApi = {
  // 📝 AUTHENTICATION
  signup: async (username, password) => {
    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  },

  login: async (username, password) => {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  },

  // 📋 GET ALL TASKS
  getTasks: async (token) => {
    const res = await fetch(`${API}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return await res.json(); // Returns the raw task array/object safely
  },

  // ➕ CREATE TASK
  createTask: async (token, title) => {
    return await fetch(`${API}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, completed: false }),
    });
  },

  // ✅ UPDATE TASK (Inline Edit & Toggle Complete)
  updateTask: async (token, id, title, completed) => {
    return await fetch(`${API}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, completed }),
    });
  },

  // 🗑️ DELETE TASK
  deleteTask: async (token, id) => {
    return await fetch(`${API}/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
