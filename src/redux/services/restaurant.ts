import axiosInstance from "../../utils/axiosInstance";

export const restaurantService = {
  async getAllFoodItems(restaurantId: number) {
    const response = await axiosInstance.get(
      `/restaurants/food/${restaurantId}`
    );
    return response;
  },
};
