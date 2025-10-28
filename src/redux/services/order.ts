import axiosInstance from "../../utils/axiosInstance";

export const orderService = {
  async getAllOrdersHistory(userId: number) {
    const response = await axiosInstance.get(`/orders/${userId}`);
    return response;
  },
};
