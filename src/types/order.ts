import type { IFood } from "./food";
import type { IRestaurant } from "./restaurant";

export type IOrder = {
  id: number;
  user_id: string;
  order_id: string;
  restaurant: IRestaurant;
  food: IFood[];
  amount: number;
  payment_status: string;
  receipt: string;
  payment_id: string;
  created_at: number;
};
