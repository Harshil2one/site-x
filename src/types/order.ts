export type IOrder = {
  id: number;
  user_id: string;
  order_id: string;
  restaurant: any;
  food: any[];
  amount: number;
  status: string;
  receipt: string;
  payment_id: string;
  created_at: number;
};
