import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

// Zustand store for managing orders
export const useOrderStore = create((set) => ({
  orders: [], // List of orders
  loading: false,
  error: null,

  // Action to create an order
  createOrder: async (orderData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/orders", orderData); // Send order data to backend
      set((prevState) => ({
        orders: [...prevState.orders, res.data], // Add the new order to the orders list
        loading: false,
      }));
      toast.success("Order placed successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to place order");
    }
  },

  // Action to fetch orders for the user
  fetchUserOrders: async (userId) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/orders/user/${userId}`);
      set({ orders: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    }
  },

  // Action to clear orders (optional)
  clearOrders: () => set({ orders: [] }),
}));
