import type { IFood } from "./food.ts";
import type { IRestaurant } from "./restaurant.ts";

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
  order_status: number;
  pickup_by: any;
  pickup_time: number;
  created_at: number;
  delivered_time: number;
  delivery_fee: number;
  user: any;
};
