import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useOrderStore = create((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  createOrder: async (orderData) => {
    if (get().loading) {
      return;
    }

    set({ loading: true });

    try {
      const res = await axios.post("/orders", orderData);

      set((prevState) => ({
        orders: [...prevState.orders, res.data],
        loading: false,
      }));

      toast.success("Order placed successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to place order");
    }
  },

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

  clearOrders: () => set({ orders: [] }),
}));
