import axiosInstance from "../../utils/axiosInstance";

export const cartService = {
  async getAllCartItems(userId: number) {
    const response = await axiosInstance.get(`/cart/${userId}`);
    return response;
  },

  async updateCartItems(userId: number, data: any) {
    const response = await axiosInstance.put(`/cart/${userId}`, data);
    return response;
  },

  async reorderCart(userId: number, data: any) {
    const response = await axiosInstance.put(`/cart/reorder/${userId}`, data);
    return response;
  },

  async emptyCartItems(userId: number) {
    const response = await axiosInstance.delete(`/cart/${userId}`);
    return response;
  },
};
