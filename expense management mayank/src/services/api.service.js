import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Add Authorization Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Authentication Error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken"); // Clear token
    }
    return Promise.reject(error);
  }
);

// API Methods
const apiService = {

  getExpenseCategoryPercentage: () => api.get("/api/dashboard/getAllExpense"),
  getIncomeCategoryPercentage: () => api.get("/api/dashboard/getAllIncome"),
  getFiveMonthsData: () => api.get("/api/dashboard/getLastFiveMonthsData"),
  getThirtyDaysData: () => api.get("/api/dashboard/getThirtyDaysData"),

  updateEntry: (_id, data) => api.patch(`/api/sheet/${_id}/updateEntry`, data),
  deleteSheet: (_id) => api.delete(`api/sheet/deleteSheet/${_id}`),
  deleteEntry: (_id, entryId) => api.delete(`api/sheet/delete/${_id}`, { data: { entryId } }),
  deletAllEntries: (_id) => api.patch(`/api/sheet/deleteAllEntries/${_id}`),
  //expenseRoutes
  getAllExpenseSheets: () => api.get("/api/sheet/getAll-expense-sheets"),
  getExpenseDetails: (_id) => api.get(`/api/sheet/getById-expense/${_id}`),
  addExpenseEntry: (_id, data) => api.patch(`/api/sheet/create-entry/${_id}`, data),
  //incomeRoutes
  getAllIncomeSheets: () => api.get("/api/sheet/getAll-income-sheets"),
  getIncomeDetails: (_id) => api.get(`/api/sheet/getById-income/${_id}`),
  addIncomeEntry: (_id, data) => api.patch(`/api/sheet/create-income-sheet-entry/${_id}`, data),
  //directExpense
  createDirectExpense: (data) => api.post("/api/direct/create-expense", data),  
  createDirectIncome: (data) => api.post("/api/direct/create-income", data),  
};

export default apiService;
