import type { RESTAURANT_MODE, RESTAURANT_TYPE } from "../enums";

export type IRestaurant = {
  id: number;
  open: number;
  name: string;
  email: string;
  contact: string;
  address: string;
  ratings: number;
  time: string;
  special: string[];
  rate: number;
  offers: string[];
  bankOffers: string;
  type: RESTAURANT_TYPE;
  distance: string;
  mode: RESTAURANT_MODE;
  isSpecial: boolean;
  images: string[];
  food: number[];
};
