import axios from "axios";

// Axios instance (you can add auth tokens or headers later if needed)
const api = axios.create({
  baseURL: "http://localhost:8000/api", // Base URL of your backend
});

// Add this interceptor:
api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Register user API call
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users/register/", userData);
    return response.data; // success response
  } catch (error) {
    throw error.response?.data || error; // return error for UI
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post("/users/login/", userData);
    return response.data; // success response
  } catch (error) {
    throw error.response?.data || error; // return error for UI
  }
};

export const incomes = async (userData) => {
  try {
    const response = await api.post("/users/incomes/", userData);
    return response.data; // success response
  } catch (error) {
    throw error.response?.data || error; // return error for UI
  }
};

// ---- BUDGETS ----

// GET: fetch all budgets
export async function fetchBudgets() {
  const response = await api.get('/users/budgets/');
  return response.data;
}

// POST: add new budget
export async function addBudget(budget) {
  const response = await api.post('/users/budgets/', budget);
  return response.data;
}

// PATCH: update existing budget
export async function updateBudget(id, data) {
  try {
    const res = await api.patch(`users/budgets/${id}/`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating budget:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
}

// DELETE: remove budget
export async function deleteBudget(id) {
  const response = await api.delete(`users/budgets/${id}/`);
  return response.data;
}



// POST: Add a new expense
export const addExpense = async (expenseData) => {
  try {
    const response = await api.post('/users/expenses/', expenseData);
    console.log("Expense added successfully:", response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error("Error adding expense:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// GET: Fetch all expenses
export const getExpenses = async () => {
  try {
    const response = await api.get('/users/expenses/');
    console.log("Fetched expenses:", response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

//  Edit an expense (partial update)
export const updateExpense = async (id, data) => {
  try {
    const res = await api.patch(`/users/expenses/${id}/`, data);
    return res.data; // updated expense object
  } catch (error) {
    console.error(
      "Error updating expense:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

export const deleteExpense = async (id) => {
  try {
    // hit the real resource id
    const res = await api.delete(`/users/expenses/${id}/`);
    // many APIs return 204 No Content here; we don’t need the body
    return res.data;
  } catch (error) {
    console.error(
      "Error deleting expense:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

// ✅ Income APIs
export const addIncome = async (payload) => {
  const response = await api.post("/users/incomes/", payload);
  return response.data;
};

export const getIncomes = async () => {
  const response = await api.get("/users/incomes/");
  return response.data;
};

export const updateIncome = async (id, payload) => {
  const response = await api.patch(`/users/incomes/${id}/`, payload);
  return response.data;
};

export const deleteIncome = async (id) => {
  await api.delete(`/users/incomes/${id}/`);
};

// ✅ Fetch dashboard statistics
export const fetchStatistics = async () => {
  const response = await api.get(`/users/dashboard/`);
  return response.data;
};

export default api;