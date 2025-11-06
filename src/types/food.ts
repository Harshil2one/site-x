import type { RESTAURANT_TYPE } from "../enums";

export type IFood = {
  count?: number;
  id: number;
  image: string;
  name: string;
  description?: string;
  price: number;
  type: RESTAURANT_TYPE;
  isBest: number;
  ratings: number;
  ratingsCount: number;
};
